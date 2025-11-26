const errorHandler = (error, req, res, next) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] Error:`, error.message);
  res.status(error.status || 500).json({
    success: false,
    error: error.name || 'Internal Server Error',
    message: error.message,
    timestamp
  });
};

export default errorHandler;
