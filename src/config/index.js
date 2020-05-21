const oc = {
  url: {
    BACKEND_API1: "http://dl-back-end-hamriia2-lab2.statwb-dev.eu.novartis.net",
    BACKEND_API2: "http://dl-back-end2-hamriia2-lab2.statwb-dev.eu.novartis.net"
  }
};

const dev = {
  url: {
    BACKEND_API1: "http://localhost:8001",
    BACKEND_API2: "http://localhost:8002"
  }
};

let config = "";

if (process.env.REACT_APP_ENV === "dev") {
  config = dev;
} else {
  config = oc;
}

export default config;
