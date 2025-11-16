import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { deleteProduct, updateProduct } from "../services/api";

function formatPrice(value) {
    if (value === null || value === undefined || value === "") return "-";

    const num =
        typeof value === "number" ? value : parseFloat(String(value).replace(",", "."));

    if (Number.isNaN(num)) return String(value); // por si viene algo raro

    return `${num.toFixed(2)} €`;
}

export default function ProductRow({ product, editMode, onUpdated }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(
        product.price !== null && product.price !== undefined
            ? String(product.price)
            : ""
    );

    const saveProduct = async () => {
        const name = editedName.trim();
        const priceNumber = parseFloat(editedPrice.replace(",", "."));

        if (!name || Number.isNaN(priceNumber)) {
            // si está mal, volvemos al valor original
            setIsEditing(false);
            setEditedName(product.name);
            setEditedPrice(
                product.price !== null && product.price !== undefined
                    ? String(product.price)
                    : ""
            );
            return;
        }

        try {
            await updateProduct(product.id, name, priceNumber);
            setIsEditing(false);
            onUpdated && onUpdated();
        } catch (e) {
            console.log("Error al actualizar producto:", e.message);
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditedName(product.name);
        setEditedPrice(
            product.price !== null && product.price !== undefined
                ? String(product.price)
                : ""
        );
    };

    const removeProduct = async () => {
        try {
            await deleteProduct(product.id);
            onUpdated && onUpdated();
        } catch (e) {
            console.log("Error al borrar producto:", e.message);
        }
    };

    return (
        <View style={styles.row}>
            {isEditing && editMode ? (
                <>
                    <TextInput
                        style={[styles.input, styles.nameInput]}
                        value={editedName}
                        onChangeText={setEditedName}
                        placeholder="Nombre"
                    />
                    <TextInput
                        style={[styles.input, styles.priceInput]}
                        value={editedPrice}
                        onChangeText={setEditedPrice}
                        placeholder="Precio"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.iconBtn} onPress={saveProduct}>
                        <Text style={styles.iconText}>✔️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} onPress={cancelEdit}>
                        <Text style={styles.iconText}>✖️</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.price}>{formatPrice(product.price)}</Text>

                    {editMode && (
                        <>
                            <TouchableOpacity
                                style={styles.iconBtn}
                                onPress={() => setIsEditing(true)}
                            >
                                <Text style={styles.iconText}>✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn} onPress={removeProduct}>
                                <Text style={styles.iconText}>🗑️</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 4,
        width: "100%",
    },
    name: {
        flex: 1,
        fontSize: 16,
    },
    price: {
        width: 80,
        textAlign: "right",
        fontSize: 16,
        fontWeight: "600",
    },
    input: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
        minHeight: 40,
    },
    nameInput: {
        flex: 1,
        marginRight: 4,
    },
    priceInput: {
        width: 80,
        marginRight: 4,
        textAlign: "right",
    },
    iconBtn: {
        marginLeft: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    iconText: {
        fontSize: 16,
    },
});
