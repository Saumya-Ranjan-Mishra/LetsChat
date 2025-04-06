import { useState } from "react";
import { checkForUserAuthentication } from "../stateManager/auth.statemanager";
import { BoldLink,  BoxContainer,  FormContainer,  HeadingText,  Input,  LineText,  SubmitButton} from "./common";
import { Marginer } from "./marginer";

const LoginPage = () => {
    const {isLoggingIn,loginUser } = checkForUserAuthentication();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(formData)
    }

    return(
            <BoxContainer>
              <FormContainer onSubmit={handleLogin}>
                <HeadingText> Login   <LineText>Please login to continue</LineText></HeadingText>
                <Input type="email" placeholder="Email" required={true}
                 value={formData.email} 
                 onChange={(e) => setFormData({...formData, email: e.target.value})} />

                <Input type="password" placeholder="Password"required={true} minLength={6} 
                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />

              <SubmitButton type="submit" disabled={isLoggingIn}>
                {isLoggingIn?"loading..." : "login"}
                
             </SubmitButton>
              </FormContainer>
              <Marginer direction="vertical" margin={10} />
              <Marginer direction="vertical" margin="5px" />
              <LineText>
                Don't have an account?{" "}
                <BoldLink href="/signup">
                  signup
                </BoldLink>
              </LineText>
            </BoxContainer>
    )
}

export default LoginPage;