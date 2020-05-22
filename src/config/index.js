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
	console.log('we saw dev');
  config = dev;
} else if (process.env.REACT_APP_ENV === 'oc') {
  console.log('we saw oc');
  config = oc;
}

export default config;
