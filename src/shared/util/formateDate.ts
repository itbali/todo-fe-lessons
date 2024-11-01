import {formatDistanceToNow} from "date-fns";

const formateDate = (createdAt: string) => {
    const createDate = new Date(createdAt)
    return formatDistanceToNow(createDate, {addSuffix: true})
}

export default formateDate;