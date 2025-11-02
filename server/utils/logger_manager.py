import logging
import os
from logging.handlers import TimedRotatingFileHandler

# Third-party imports
from uvicorn.logging import ColourizedFormatter

class LoggerManager:
    LOG_DIR = "logs"
    LOG_LEVELS = {
        "info": logging.INFO,
        "error": logging.ERROR,
        "debug": logging.DEBUG,
        "warning": logging.WARNING
    }

    def __init__(self, module_name, log_type="general"):
        self.module_name = module_name
        self.log_type = log_type.lower()
        # Use uvicorn.error as base logger, similar to your old project
        self.logger = logging.getLogger(f"uvicorn.error.{module_name}-{log_type}")
        self.logger.setLevel(self.LOG_LEVELS.get(log_type, logging.DEBUG))

        if not self.logger.handlers:
            self._setup_handler()

    def _setup_handler(self):
        os.makedirs(self.LOG_DIR, exist_ok=True)

        file_path = os.path.join(self.LOG_DIR, f"{self.log_type}_{self.module_name}.log")

        # File handler with TimedRotatingFileHandler and old project format
        file_handler = TimedRotatingFileHandler(
            file_path, when="midnight", backupCount=7, encoding='utf-8'
        )
        file_handler.setLevel(logging.INFO)
        file_formatter = logging.Formatter(
            '%(asctime)s - %(levelname)s - [%(filename)s:%(lineno)d - %(funcName)s()] - %(message)s'
        )
        file_handler.setFormatter(file_formatter)
        # Check to avoid duplicate file handlers
        if not any(isinstance(h, TimedRotatingFileHandler) for h in self.logger.handlers):
            self.logger.addHandler(file_handler)

        # Console handler with Uvicorn-style format
        console_handler = logging.StreamHandler()
        console_formatter = ColourizedFormatter(
            # Mimic Uvicorn's default format: INFO:logger_name:message
            fmt="%(levelprefix)s%(name)s:%(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
            use_colors=True
        )
        console_handler.setFormatter(console_formatter)
        # Check to avoid duplicate console handlers
        if not any(isinstance(h, logging.StreamHandler) for h in self.logger.handlers):
            self.logger.addHandler(console_handler)

    def log(self, level, message):
        log_func = getattr(self.logger, level.lower(), self.logger.info)
        log_func(message)

    def info(self, message): self.log("info", message)
    def error(self, message): self.log("error", message)
    def debug(self, message): self.log("debug", message)
    def warning(self, message): self.log("warning", message)