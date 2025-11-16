// READ - Decií hacer los dos GET a la vez para optimizar las llamadas
export async function getAllMenuData() {
    const BASE_URL = "https://jlorenzo.ddns.net/carta_restaurante";
    const USUARIO_ID = 4796;

    const resCat = await fetch(
        `${BASE_URL}/categorias/?usuario_id=${USUARIO_ID}`,
        { method: "GET" }
    );

    const dataCat = await resCat.json();

    const menu = await Promise.all(
        dataCat.data.map(async (cat) => {
            const resProd = await fetch(
                `${BASE_URL}/productos/${cat.id}?usuario_id=${USUARIO_ID}`,
                { method: "GET" }
            );
        const dataProd = await resProd.json();

        return {
            id: cat.id,
            name: cat.nombre,
            photoURL: "",
            products: dataProd.data.map((p) => ({
                id: p.id,
                name: p.nombre,
                price: p.precio,
                })),
            };
        })
    );
    return { menu };
}

// === CATEGORÍAS ===
// CREATE
export async function addCategory(nuevaCategoria) {
    const API_URL = "https://jlorenzo.ddns.net/carta_restaurante/categorias/";
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuario_id: 4796,
            nombre: nuevaCategoria,
        }),
    });
    if (!res.ok) throw new Error("Error al añadir categoría");
        return await res.json();
}

// UPDATE
export async function updateCategory(idCategoria, nuevoNombre) {
    const API_URL = `https://jlorenzo.ddns.net/carta_restaurante/categorias/${idCategoria}`;
    const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuario_id: 4796,
            nombre: nuevoNombre
        }),
    });
    if (!res.ok) throw new Error("Error al modificar categoría");
        return await res.json();
}

// DELETE
export async function deleteCategory(idCategoria) {
    const API_URL = `https://jlorenzo.ddns.net/carta_restaurante/categorias/${idCategoria}`;
    const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: 4796 }),
        });
    if (!res.ok) throw new Error("Error al borrar categoría");
        return await res.json();
}

// === PRODUCTOS ===
// CREATE
export async function addProduct(idCategoria, nombreProducto, precio,) {
    const API_URL = `https://jlorenzo.ddns.net/carta_restaurante/productos/${idCategoria}`;
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuario_id: 4796,
            nombre: nombreProducto,
            precio: precio,
        }),
    });
    if (!res.ok) throw new Error("Error al añadir producto");
        return await res.json();
}

// UPDATE
export async function updateProduct(idProducto, nuevoNombre, nuevoPrecio) {
    const API_URL = `https://jlorenzo.ddns.net/carta_restaurante/productos/${idProducto}`;
    const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuario_id: 4796,
            nombre: nuevoNombre,
            precio: nuevoPrecio,
        }),
    });
    if (!res.ok) throw new Error("Error al modificar producto");
        return await res.json();
}

// DELETE
export async function deleteProduct(idProducto) {
    const API_URL = `https://jlorenzo.ddns.net/carta_restaurante/productos/${idProducto}`;
    const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario_id: 4796 }),
    });
    if (!res.ok) throw new Error("Error al borrar producto");
        return await res.json();
}
