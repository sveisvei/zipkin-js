module.exports = {
  record(rec) {
    /* eslint-disable no-console */
    const id = rec.traceId;
    console.log(
      `Record at (spanId=${id.spanId}, parentId=${id.parentId},` +
      ` traceId=${id.traceId}): ${rec.annotation.toString()}`
    );
  },
  toString() {
    return 'consoleTracer';
  }
};
