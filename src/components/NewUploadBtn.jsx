import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function FloatingButton({ colour, children, onPress }) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[styles.button, { backgroundColor: colour }]}
        >
            {children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        
    }
})