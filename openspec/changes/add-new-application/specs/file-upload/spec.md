## ADDED Requirements

### Requirement: Presigned URL endpoint for PDF upload
The system SHALL provide a Next.js API route that generates a MinIO presigned PUT URL for uploading a PDF resume.

#### Scenario: Presigned URL generated successfully
- **WHEN** an authenticated user requests a presigned URL with a valid filename
- **THEN** the API returns a presigned PUT URL and the resulting object URL that will be stored in metadata

#### Scenario: Authentication required
- **WHEN** an unauthenticated request is made to the presign endpoint
- **THEN** the request is rejected with a 401 response

#### Scenario: Non-PDF file rejected
- **WHEN** the requested filename does not have a .pdf extension
- **THEN** the API returns a 400 error and no presigned URL is generated

#### Scenario: Bucket name is configurable
- **WHEN** the presign endpoint is called
- **THEN** the MinIO bucket used is determined by the MINIO_BUCKET_NAME environment variable, defaulting to "trunk-applications"

### Requirement: Client-side PDF upload flow
The system SHALL support uploading a PDF directly from the browser to MinIO using the presigned URL.

#### Scenario: Successful upload
- **WHEN** a user selects a PDF file and the upload completes successfully
- **THEN** the resulting MinIO object URL is available to be stored as jobUrlFile in the application metadata

#### Scenario: Upload before form submission
- **WHEN** a user selects a PDF file in the application form
- **THEN** the file is uploaded to MinIO before the application creation tRPC call is made

#### Scenario: File size limit enforced client-side
- **WHEN** a user selects a PDF larger than 10MB
- **THEN** an error message is shown and the upload is not attempted

#### Scenario: Upload is optional
- **WHEN** a user submits the application form without selecting a PDF
- **THEN** jobUrlFile is null and the application is created successfully without a file

### Requirement: Resume URL persisted in application metadata
The system SHALL store the MinIO object URL of the uploaded PDF in the APPLICATION event's metadata.

#### Scenario: jobUrlFile stored on successful upload
- **WHEN** a PDF upload completes and the application is submitted
- **THEN** the event's metadata.jobUrlFile contains the full MinIO object URL of the uploaded file

#### Scenario: jobUrlFile is null when no file uploaded
- **WHEN** the application is submitted without a file
- **THEN** the event's metadata.jobUrlFile is null
