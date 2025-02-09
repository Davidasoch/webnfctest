export  function read() {
  
    const ndef = new NDEFReader();

  return new Promise((resolve, reject) => {
    const ctlr = new AbortController();
    ctlr.signal.onabort = reject;
    ndef.addEventListener("reading", event => {
      ctlr.abort();
      resolve(event);
    }, { once: true });
    ndef.scan({ signal: ctlr.signal }).catch(err => reject(err));
  });
}

