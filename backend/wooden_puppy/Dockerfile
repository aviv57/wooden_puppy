FROM python:3.9 as python-base

# https://python-poetry.org/docs#ci-recommendations
ENV POETRY_VERSION=1.6.1
ENV POETRY_HOME=/opt/poetry
ENV POETRY_VENV=/opt/poetry-venv

# Tell Poetry where to place its cache and virtual environment
ENV POETRY_CACHE_DIR=/opt/.cache

# Creating a virtual environment just for poetry and install it with pip
RUN python3 -m venv $POETRY_VENV \
	&& $POETRY_VENV/bin/pip install -U pip setuptools \
	&& $POETRY_VENV/bin/pip install poetry==${POETRY_VERSION}

# Add Poetry to PATH
ENV PATH="${PATH}:${POETRY_VENV}/bin"

WORKDIR /app

# Copy Dependencies
COPY poetry.lock pyproject.toml ./

# Install Dependencies
RUN poetry install --no-interaction --no-cache

# Copy Application
COPY . /app


EXPOSE 80

#uvicorn main:app
#poetry run python -m uvicorn main:app --host 0.0.0.0 --port 80
CMD [ "poetry", "run", "python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"] 