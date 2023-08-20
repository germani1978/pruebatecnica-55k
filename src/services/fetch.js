const URL = "https://randomuser.me/api?results=10&seed=gba";

export async function getData() {
    try {
        const res = await fetch(URL);
        if (!res.ok) throw Error("Error en el fetch");
        const data = await res.json();
        return data.results;
    } catch (error) {
        return null;
    }
}