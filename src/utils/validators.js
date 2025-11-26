export const validateDocument = (req, res, next) => {
  const { document_name, form_values } = req.body;
  const errors = [];
  
  if (!document_name || typeof document_name !== 'string' || document_name.trim().length === 0) {
    errors.push('document_name is required and must be a non-empty string');
  }
  
  if (form_values && !Array.isArray(form_values)) {
    errors.push('form_values must be an array');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: 'Validation Error', message: 'Request validation failed', errors, timestamp: new Date().toISOString() });
  }
  
  next();
};

export const validateDocumentUpdate = (req, res, next) => {
  const { document_name, form_values } = req.body;
  if (!document_name && !form_values) {
    return res.status(400).json({ success: false, error: 'Validation Error', message: 'At least one field required', timestamp: new Date().toISOString() });
  }
  next();
};
