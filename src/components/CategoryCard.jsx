import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { addProduct, deleteCategory, updateCategory } from "../services/api";
import ProductRow from "./ProductRow";

export default function CategoryCard({ category, editMode, onUpdated }) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editedName, setEditedName] = useState(category.name);
    const [nombreProducto, setNombreProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState("");

    const saveCatName = async () => {
        const trimmed = editedName.trim();
        if (!trimmed || trimmed === category.name) {
            setIsEditingName(false);
            setEditedName(category.name);
            return;
        }
        try {
            await updateCategory(category.id, trimmed);
            setIsEditingName(false);
            onUpdated && onUpdated();
        } catch (e) { }
    };

    const cancelCatEdit = () => {
        setIsEditingName(false);
        setEditedName(category.name);
    };

    const deleteCat = async () => {
        try {
            await deleteCategory(category.id);
            onUpdated && onUpdated();
        } catch (e) { }
    };

    const addItem = async () => {
        if (!nombreProducto.trim() || !precioProducto) return;
        try {
            await addProduct(
                category.id,
                nombreProducto.trim(),
                parseFloat(precioProducto.replace(",", "."))
            );
            setNombreProducto("");
            setPrecioProducto("");
            onUpdated && onUpdated();
        } catch (e) { }
    };

    return (
        <View style={styles.dishesCardContainer}>
            <View style={styles.card}>
                <View style={styles.header}>
                    {isEditingName && editMode ? (
                        <>
                            <TextInput
                                style={styles.catNameInput}
                                value={editedName}
                                onChangeText={setEditedName}
                                placeholder="Nombre categoría"
                            />
                            <TouchableOpacity style={styles.iconBtn} onPress={saveCatName}>
                                <Text style={styles.iconText}>✔️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn} onPress={cancelCatEdit}>
                                <Text style={styles.iconText}>✖️</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.title}>{category.name}</Text>
                            {editMode && (
                                <>
                                    <TouchableOpacity
                                        style={styles.iconBtn}
                                        onPress={() => setIsEditingName(true)}
                                    >
                                        <Text style={styles.iconText}>✏️</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.iconBtn} onPress={deleteCat}>
                                        <Text style={styles.iconText}>🗑️</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </>
                    )}
                </View>

                <Image
                    source={require("../../assets/images/coffee.jpg")}
                    style={styles.categoryImage}
                    resizeMode="contain"
                />

                {category.products.length === 0 ? (
                    <Text style={styles.empty}>Sin productos</Text>
                ) : (
                    category.products.map((p) => (
                        <ProductRow
                            key={p.id}
                            product={p}
                            editMode={editMode}
                            onUpdated={onUpdated}
                        />
                    ))
                )}

                {editMode && (
                    <View style={styles.addDishForm}>
                        <TextInput
                            style={[styles.input, styles.inputNombre]}
                            placeholder="Nombre"
                            value={nombreProducto}
                            onChangeText={setNombreProducto}
                        />
                        <TextInput
                            style={[styles.input, styles.inputPrecio]}
                            placeholder="Precio"
                            keyboardType="numeric"
                            value={precioProducto}
                            onChangeText={setPrecioProducto}
                        />
                        <TouchableOpacity style={styles.addBtn} onPress={addItem}>
                            <Text style={styles.addBtnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dishesCardContainer: {
        width: "100%",
        alignItems: "center",
        marginTop: 5,
    },
    card: {
        width: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
    },
    catNameInput: {
        flex: 1,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
        minHeight: 40,
    },
    iconBtn: {
        marginLeft: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    iconText: {
        fontSize: 18,
    },
    categoryImage: {
        width: 40,
        height: 40,
        alignSelf: "center",
        marginBottom: 6,
        marginTop: 2,
    },
    empty: {
        color: "#555",
        marginBottom: 4,
        textAlign: "center",
    },
    addDishForm: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
        alignSelf: "stretch",
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
    inputNombre: {
        flex: 1,
        marginRight: 4,
    },
    inputPrecio: {
        width: 70,
        marginRight: 4,
    },
    addBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgb(136,124,107)",
        alignItems: "center",
        justifyContent: "center",
    },
    addBtnText: {
        fontSize: 20,
        color: "#fff",
        marginTop: -1,
    },
});
