-- +goose Up
-- +goose StatementBegin
CREATE TABLE secrets (
    id UUID PRIMARY KEY,
    secret TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    one_time BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    viewed BOOLEAN DEFAULT FALSE
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS secrets;
-- +goose StatementEnd
