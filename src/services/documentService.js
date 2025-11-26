import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = process.env.DATA_PATH || path.join(__dirname, 'data/documents.json');

const readDocuments = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT' || error instanceof SyntaxError) return [];
    throw error;
  }
};

const writeDocuments = async (documents) => {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(documents, null, 2), 'utf-8');
};

export const getAllDocuments = async (page = 1, limit = 10) => {
  const documents = await readDocuments();
  const start = (page - 1) * limit;
  return documents.slice(start, start + limit).map(doc => ({ id: doc.id, document_name: doc.document_name, created_at: doc.created_at, field_count: doc.fields ? doc.fields.length : 0 }));
};

export const getDocumentById = async (id) => {
  const documents = await readDocuments();
  const document = documents.find(d => d.id === id);
  return document ? { documentName: document.document_name, fields: document.fields || [] } : null;
};

export const createDocument = async (documentName, formValues = []) => {
  const documents = await readDocuments();
  const newId = documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1;
  
  const fields = (formValues || []).map((field, index) => ({
    id: index + 1,
    field_seq: parseInt(field.field_seq) || (index + 1) * 10,
    is_mandatory: field.is_mandatory ? 1 : 0,
    field_type: field.field_type || 1,
    field_name: field.field_name || '',
    document_id: newId,
    select_values: field.select_values || null
  }));
  
  const newDocument = { id: newId, document_name: documentName, created_at: new Date().toISOString(), fields };
  documents.push(newDocument);
  await writeDocuments(documents);
  
  return { id: newDocument.id, document_name: newDocument.document_name, created_at: newDocument.created_at, field_count: fields.length };
};

export const updateDocument = async (id, documentName, formValues = []) => {
  const documents = await readDocuments();
  const documentIndex = documents.findIndex(d => d.id === id);
  if (documentIndex === -1) return null;
  
  const fields = (formValues || []).map((field, index) => ({
    id: index + 1,
    field_seq: parseInt(field.field_seq) || (index + 1) * 10,
    is_mandatory: field.is_mandatory ? 1 : 0,
    field_type: field.field_type || 1,
    field_name: field.field_name || '',
    document_id: id,
    select_values: field.select_values || null
  }));
  
  documents[documentIndex] = { ...documents[documentIndex], document_name: documentName, fields };
  await writeDocuments(documents);
  
  return { id: documents[documentIndex].id, document_name: documents[documentIndex].document_name, created_at: documents[documentIndex].created_at, field_count: fields.length };
};

export const deleteDocument = async (id) => {
  const documents = await readDocuments();
  const filtered = documents.filter(d => d.id !== id);
  if (filtered.length === documents.length) return false;
  await writeDocuments(filtered);
  return true;
};
