import { StyleSheet, Platform } from 'react-native';

export const globalColors = {
    backgroundBlue: '#dff0fe',
};

export const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: globalColors.backgroundBlue, 
        flex: 1,
    },
    formContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    form_inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingLeft: 5,
        width: Platform.OS === 'web' ? 350 : 260,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dedede',
        backgroundColor: '#fff',
    },
    form_label: {
        color: '#1d1c3b',
        backgroundColor: '#fff',
        padding: 8,
        position: 'relative',
        top: Platform.OS === 'android' ? -8.1 : -7,
        left: 0,
        borderRadius: 5,
        height: 40,
    },
    form_input: {
        fontSize: 16,
        flex: 1,
        marginHorizontal: 5,
        paddingLeft: 5,
        outlineStyle: 'none',
    },
    submitBtn: {
        marginTop: 20,
        padding: 5,
        width: Platform.OS === 'android' ? 300 : 260,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 200,
        borderWidth: 1,
    },
    errorText: {
        fontSize: 12,
    },
});