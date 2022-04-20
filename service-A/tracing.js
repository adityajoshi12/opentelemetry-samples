
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-otlp-grpc');
const opentelemetry = require('@opentelemetry/api');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { HttpInstrumentation} =require("@opentelemetry/instrumentation-http")

module.exports = (serviceName) => {
  registerInstrumentations({
  instrumentations: [ getNodeAutoInstrumentations(),

  new HttpInstrumentation()
  ],
  });
  opentelemetry.diag.setLogger(
  new opentelemetry.DiagConsoleLogger(),
  opentelemetry.DiagLogLevel.DEBUG,
  );

  const exporter = new OTLPTraceExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT, 
      headers: {}, 
      concurrencyLimit: 10,
  });

  const provider = new NodeTracerProvider({
       resource: new Resource({
              [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
            }),
  });
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.register();
  return opentelemetry.trace.getTracer(serviceName);
};