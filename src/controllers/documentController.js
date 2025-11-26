import * as documentService from '../services/documentService.js';

export const getAllDocuments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const documents = await documentService.getAllDocuments(parseInt(page), parseInt(limit));
    res.json({ success: true, data: documents, pagination: { page: parseInt(page), limit: parseInt(limit), total: documents.length }, timestamp: new Date().toISOString() });
  } catch (error) { next(error); }
};

export const getDocumentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await documentService.getDocumentById(parseInt(id));
    if (!document) return res.status(404).json({ success: false, error: 'Document not found', message: `Document with ID ${id} does not exist`, timestamp: new Date().toISOString() });
    res.json({ success: true, data: document, timestamp: new Date().toISOString() });
  } catch (error) { next(error); }
};

export const createDocument = async (req, res, next) => {
  try {
    const { document_name, form_values } = req.body;
    const newDocument = await documentService.createDocument(document_name, form_values);
    res.status(201).json({ success: true, data: newDocument, message: 'Document created successfully', timestamp: new Date().toISOString() });
  } catch (error) { next(error); }
};

export const updateDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { document_name, form_values } = req.body;
    const updatedDocument = await documentService.updateDocument(parseInt(id), document_name, form_values);
    if (!updatedDocument) return res.status(404).json({ success: false, error: 'Document not found', message: `Document with ID ${id} does not exist`, timestamp: new Date().toISOString() });
    res.json({ success: true, data: updatedDocument, message: 'Document updated successfully', timestamp: new Date().toISOString() });
  } catch (error) { next(error); }
};

export const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await documentService.deleteDocument(parseInt(id));
    if (!success) return res.status(404).json({ success: false, error: 'Document not found', message: `Document with ID ${id} does not exist`, timestamp: new Date().toISOString() });
    res.json({ success: true, message: 'Document deleted successfully', deletedId: parseInt(id), timestamp: new Date().toISOString() });
  } catch (error) { next(error); }
};
