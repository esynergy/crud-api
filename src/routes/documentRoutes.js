import express from 'express';
import * as documentController from '../controllers/documentController.js';
import { validateDocument, validateDocumentUpdate } from '../utils/validators.js';

const router = express.Router();

router.get('/documents', documentController.getAllDocuments);
router.get('/document/:id', documentController.getDocumentById);
router.post('/documents/create', validateDocument, documentController.createDocument);
router.put('/documents/:id', validateDocumentUpdate, documentController.updateDocument);
router.delete('/documents/:id', documentController.deleteDocument);

export default router;
