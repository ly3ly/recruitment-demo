

//时间戳转时间字符串 2024-01-25T02:01:27.682+08:00

export default function timestamp2timestring(timestamp) {
    const date = new Date(timestamp * 1000); // 创建 Date 对象

    // 获取年月日时分秒
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // 构建时间字符串
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC+08:00`;
    // console.log(formattedDate)
    return formattedDate
}

// timestamp2timestring("1708312136")