


export const updateValidationMessages = (password:string, setValidationMessages: (newMsg:object) => void) => {
    const regexCapital = /[A-Z]/;
    const regexSpecial = /[!@#$%^&*(),.?":_{}|<>]/;
    
    const newMessages = {
      passLength: password.length < 8 ? "" : "hidden",
      passCapital: regexCapital.test(password) ? "hidden" : "",
      passSpecial: regexSpecial.test(password) ? "hidden" : "",
    };
    setValidationMessages(newMessages);
  };