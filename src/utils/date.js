export const formatDate = (date) => {
    let parsedDate = date;

    if (typeof date === "string") {
        parsedDate = new Date(date);
    }
    // const alternateForm = `${paredDate.getDate()}/${paredDate.getMonth() + 1 }/${paredDate.getFullYear()}`;

    return  parsedDate.getDate() + "/" + (parsedDate.getMonth() +1) + "/" + parsedDate.getFullYear();
};