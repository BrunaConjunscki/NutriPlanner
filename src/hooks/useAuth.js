import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
}

export default useAuth;
