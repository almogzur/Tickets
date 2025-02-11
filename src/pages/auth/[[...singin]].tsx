import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useContext, SyntheticEvent } from "react";
import {
  Stack as Flex,
  Box,
  Typography,
  Button,
  Alert,
} from "@mui/material";

// was trwoing Prop className did not match  and hydration errors  
//  
const Paper = dynamic(() => import("@mui/material/Paper"), { ssr: false });
const InputWrap = dynamic(() => import("@/components/gen/TeextFiledWrpa/input-wrap"), { ssr: false });

import Image from "next/image";
import Logo from "../../../public/logo.png";
import { useTheme } from "@mui/material/styles";
import { MdOutlineCancelPresentation } from "react-icons/md";
import WidthContext from "@/context/WidthContext";
import { NewUserType } from "@/types/pages-types/supervisor-types";
import dynamic from "next/dynamic";

interface ErrorMessagesType {
  [key: string]: string;
}

export default function SignInPage() {
  const router = useRouter();
  const theme = useTheme();
  const { xs } = useContext(WidthContext);

  const { error } = router.query;

  const errorMessages: ErrorMessagesType = {
    error: "שגיאה כללית ",
    Callback: "Error in the OAuth callback handler route.",
    CredentialsSignin: "שם משתמש או סמסמה לא קיימים במערכת ",
    Default: "שגיאה במערכת נסה שנית ",
  };

  const [formData, setFormData] = useState<NewUserType>({
    name: "",
    password: "",
  });

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    signIn("credentials", {
      name: formData.name,
      password: formData.password,
      callbackUrl: "/admin", // Redirect based on slug
    });
  };

  return (
   <form  onSubmit={submit}>
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Paper elevation={16} sx={{ width: "90%", maxWidth: 1000, p: 1 }}>
        <Flex alignItems={"center"} sx={{ height: !xs ? 450 : 600 }}>
          <MdOutlineCancelPresentation
            size={"3em"}
            color={theme.palette.primary.main}
            style={{ marginTop: 15, marginRight: 15 }}
            onClick={() => router.push("/")}
          />

          <Flex justifyContent={"center"} m={2}>
            <Typography color={theme.palette.primary.main} textAlign={"center"}>
              התחברות למערכת 
            </Typography>

            <Flex direction={"row"} justifyContent={"center"}>
              <Image src={Logo} width={100} height={100} alt="Logo" fetchPriority='auto' />
            </Flex>

            <InputWrap
              placeholder="שם משתמש"
              variant="outlined"
              value={formData.name}
              label={"שם משתמש"}
              onChangeHndler={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
              helpText={""}
              isLabelBold
              isValueBold
              placeholderStyle={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
                opacity: 1,
              }}
              labelPositioin={"top"}
              autoComplete="username"
            />

            <InputWrap
              value={formData.password}
              onChangeHndler={(e) =>
                setFormData((p) => ({ ...p, password: e.target.value }))
              }
              inputType="password"
              variant="outlined"
              label={"סיסמה"}
              helpText={""}
              isLabelBold
              labelPositioin={"top"}
              placeholder={"סיסמה"}
              placeholderStyle={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
                opacity: 1,
              }}
              autoComplete="current-password"
            />
          </Flex>

          <Button
            type='submit'
            sx={{
              width: 170,
              bgcolor: theme.palette.primary.main,
              color: "#fff",
              p: 1,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            התחבר
          </Button>
        </Flex>

        {typeof error === "string" && errorMessages[error] && (
          <Alert sx={{ direction: "rtl" }} severity="error">
            {errorMessages[error]}
          </Alert>
        )}
      </Paper>
    </Flex>
    </form>
  );
}
