ARG BASE=ecc-openshell-fixture:0.1.3
FROM ${BASE}
USER root
RUN apt-get update && apt-get install -y --no-install-recommends nodejs && rm -rf /var/lib/apt/lists/*
COPY auth-return-path.cjs worker.cjs snapshot.json /sandbox/references/
USER ubuntu
WORKDIR /sandbox/output
CMD ["sleep", "infinity"]
