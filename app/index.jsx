import { useEffect, useState } from "react";
import {
    FlatList,
    ImageBackground,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryCard from "../src/components/CategoryCard";
import { addCategory, getAllMenuData } from "../src/services/api";

export default function Index() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    async function load() {
        try {
            const { menu } = await getAllMenuData();
            setMenu(menu);
        } catch (e) {
            console.log("Error cargando menú:", e.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    const toggleEdit = () => setEditMode((v) => !v);

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            await addCategory(newCategoryName.trim());
            setNewCategoryName("");
            load();
        } catch (e) {
            console.log("Error añadiendo categoría:", e.message);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.screen}>
                <Text style={styles.loading}>Cargando menú…</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ImageBackground
                source={require("../assets/images/beans.jpg")}
                style={styles.bg}
                resizeMode="cover"
            >
                <View style={styles.menuWrapper}>
                    <View style={styles.menuCard}>
                        <Text style={styles.title}>CAMPER CAFE</Text>
                        <Text style={styles.subtitle}>Est. 2020</Text>

                        <View style={styles.topDivider} />

                        <Text style={styles.editToggle} onPress={toggleEdit}>
                            {editMode ? "X" : "✏️"}
                        </Text>

                        <View style={styles.mainMenu}>
                            <FlatList
                                contentContainerStyle={styles.menuList}
                                data={menu}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={({ item }) => (
                                    <CategoryCard
                                        category={item}
                                        editMode={editMode}
                                        onUpdated={load}
                                    />
                                )}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={() => {
                                            setRefreshing(true);
                                            load();
                                        }}
                                    />
                                }
                                showsVerticalScrollIndicator={false}
                            />

                            {editMode && (
                                <View style={styles.addCategoryContainer}>
                                    <TextInput
                                        style={styles.addCategoryInput}
                                        placeholder="Nombre nueva categoría"
                                        value={newCategoryName}
                                        onChangeText={setNewCategoryName}
                                    />
                                    <TouchableOpacity
                                        style={styles.addCategoryBtn}
                                        onPress={handleAddCategory}
                                    >
                                        <Text style={styles.addCategoryBtnText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <View style={styles.footer}>
                            <View style={styles.bottomDivider} />
                            <Text style={styles.footerLink}>Visit our website</Text>
                            <Text style={styles.footerText}>123 Free Code Camp Drive</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#000",
    },
    bg: {
        flex: 1,
    },
    menuWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    menuCard: {
        backgroundColor: "rgb(222,184,135)",
        width: "90%",
        maxWidth: 420,
        height: "80%",
        borderRadius: 4,
        paddingHorizontal: 24,
        paddingVertical: 16,
        position: "relative",
    },
    loading: {
        padding: 20,
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        color: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "900",
        textAlign: "center",
        letterSpacing: 1,
        marginTop: 8,
    },
    subtitle: {
        marginTop: 8,
        textAlign: "center",
        fontSize: 14,
    },
    topDivider: {
        marginTop: 24,
        borderBottomWidth: 2,
        borderBottomColor: "#8b0000",
    },
    editToggle: {
        position: "absolute",
        top: 10,
        right: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "#e29d42ff",
        fontSize: 18,
        lineHeight: 32,
    },
    mainMenu: {
        flex: 1,
        marginTop: 24,
        marginBottom: 12,
    },
    menuList: {
        paddingBottom: 12,
    },
    addCategoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    addCategoryInput: {
        flex: 1,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
        minHeight: 40,
        marginRight: 6,
    },
    addCategoryBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgb(136,124,107)",
        alignItems: "center",
        justifyContent: "center",
    },
    addCategoryBtnText: {
        fontSize: 20,
        color: "#fff",
        marginTop: -1,
    },
    footer: {
        alignItems: "center",
    },
    bottomDivider: {
        borderBottomWidth: 2,
        borderBottomColor: "#8b0000",
        alignSelf: "stretch",
        marginBottom: 12,
    },
    footerLink: {
        textDecorationLine: "underline",
        marginBottom: 4,
    },
    footerText: {
        fontSize: 12,
    },
});
