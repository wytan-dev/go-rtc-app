FROM golang:1.25.3-alpine

# Create and set the working directory
WORKDIR /app

# Copy the Go modules files first to leverage Docker caching
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the main package
RUN go build -o main main.go

# Command to run the application
CMD ["/app/main"]