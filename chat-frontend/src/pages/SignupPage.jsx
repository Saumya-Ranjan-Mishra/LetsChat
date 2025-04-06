import React, { useContext } from "react";
import { BoldLink,  BoxContainer,  FormContainer,  HeadingText,  Input,  LineText,  SubmitButton} from "./common";
import { Marginer } from "./marginer";
import { useState } from "react";
import { checkForUserAuthentication } from "../stateManager/auth.statemanager";

export default function SignupPage() {
    const {isSigningUp, signupUser } = checkForUserAuthentication();
     const [formData, setFormData] = useState({
        fullName : "",
        email: "",
        password: "",
    })
      
      const handleSubmit = (e) => {
        e.preventDefault();

        signupUser(formData); 
      };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleSubmit}>
        <HeadingText> Create Account   <LineText>Please sign-up to continue</LineText></HeadingText>
        <Input type="text" placeholder="Full name" required={true} value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
        <Input type="email" placeholder="Email" required={true} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <Input type="password" placeholder="Password"required={true} minLength={6} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
      <SubmitButton type="submit" disabled={isSigningUp}>
        {isSigningUp?"loading..." : "Signup"}
        
     </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink href="/login">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}