import colors from "../../constants/colours"


const styles = {
    boxFilter: {
        backgroundColor: colors.black_gray,
        borderRadius: 10,
        height: 25,
        width: 25,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    secondCard: {
        backgroundColor: colors.white,
        borderRadius: 10
    },
    secondCardSection1: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    secondCardSection2: {
        width: "100%",
        borderColor: colors.black,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        marginBottom: 10
    },
    masquerBox: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center"
    },
    imgMask: {
        height: 15,
        width: 15
    },
    dividerBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    dropDownIcon: {
        height: 20,
        width: 20,
        marginRight: 5
    },
    select: {
        height: 30,
        width: 60,
    },
    datePicker: {
        height: 30,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.normal_gray,
        borderRadius: 10
    },
    nextDispoLabel: {
        fontSize: 17,
        fontWeight: 500,
    },
    rdvDayLabel: {
        fontSize: 15,
        fontWeight: 500,
        color: colors.text_grey_hint,
        marginBottom: 5
    },
    jourRdvBox: {
        padding: 10,
        borderRadius: 10,
        borderColor: colors.text_grey_hint,
        borderWidth: 0.5,
        backgroundColor: 'transparent',
    },
    hourRdvBox: {
        padding: 10,
        borderRadius: 10,
        borderColor: colors.text_grey_hint,
        borderWidth: 0.5,
        backgroundColor: 'transparent',
    },
    rdvHoureLabel: {
        fontSize: 15,
        fontWeight: 500,
        color: colors.text_grey_hint,
        marginBottom: 10
    },
    arrowScrollView: {
        height: 25,
        width: 25,
        backgroundColor: colors.trans_primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    BoxSelectDayInfo: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnSubmitPut: {
        height: 40,
        width: '45%',
        borderRadius: 10,
        borderColor: colors.primary,
    },
    btnSubmitText: {
        fontSize: 15
    },
    btnContainer: {
        width: '100%',
        padding: 10,
        display: "flex",
        justifyContent: "space-between",
        top: 0
    }
}

export default styles


