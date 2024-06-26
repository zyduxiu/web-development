import { message } from "antd";

export const BASEURL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080';
export const PREFIX = `${BASEURL}/api`;
export const DUMMY_RESPONSE = {
    ok: false,
    message: "网络错误"
}

export async function addNewMember(member) {
    const url = `${PREFIX}/members/add`;
    let res;
    try {
        res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member),
            credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
            message.success("Successfully added new member");
        } else {
            throw new Error(data.message || 'Failed to add member');
        }
    } catch (e) {
        console.error("Add member error:", e);
        message.error(e.message || "Error adding member.");
        return DUMMY_RESPONSE;
    }
}
