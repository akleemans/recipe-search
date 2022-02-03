CREATE TABLE recipe
(
    id           INTEGER PRIMARY KEY ASC,
    source_id    TEXT,
    name         TEXT,
    url          TEXT,
    image        TEXT,
    instructions TEXT,
    ingredients  TEXT,
    keywords     TEXT,
    prep_time    TEXT,
    total_time   TEXT,
    source       TEXT,
    thumbnail    TEXT
);
