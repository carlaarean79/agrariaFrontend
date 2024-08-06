import { useContext, useEffect } from "react";
import { contexto } from "../Contexto/Contexto";

export const fetchGet = async (url) => {

    try {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return await res.json();
    } catch (error) {
        throw error;

    }

}