const {trace, consoleTracer} = require('zipkin-core');
const zipkinClient = require('../src/zipkinClient');

const Memcached = require('memcached');
describe('membached interceptor', () => {
  it('should intercept memcached calls', done => {
    trace.letTracer(consoleTracer, () => {
      trace.setId(trace.cleanId());
      const memcached = new (zipkinClient(Memcached))('localhost:11211');
      memcached.set('foo', 'bar', 10, err => {
        if (err) {
          console.error(err);
          done(err);
        } else {
          memcached.getMulti(['foo', 'fox'], (err, data) => {
            if (err) {
              done(err);
            } else {
              expect(data).to.deep.equal({foo: 'bar'});
              done();
            }
          });
        }
      });
    });
  });
});
