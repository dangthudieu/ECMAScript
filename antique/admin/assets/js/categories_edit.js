const urlParams = new URLSearchParams(window.location.search);
const cate_id = urlParams.get('id');

function getCateUpdate() {
    axios.get(API_URL + API_CATEGORIES + cate_id)
        .then(response => {
            const cate = response.data;

            document.getElementById("id").value = cate.id;
            document.getElementById("name").value = cate.name;
        })
        .catch(error => {
            console.error("Lỗi khi lấy thông tin danh mục", error);
        });
}

getCateUpdate();
function update() {
    const updatedCate = {
        "id": document.getElementById("id").value,
        "name": document.getElementById("name").value,
        
    };

    // Gửi yêu cầu PUT để cập nhật sản phẩm
    axios.put(API_URL + API_CATEGORIES + cate_id, updatedCate)
        .then(response => {
            console.log(response.data);  // Log the response for debugging
            window.location.href = "../pages/tables_categories.html";
        })
        .catch(error => {
            console.error("Lỗi khi cập nhật danh mục", error);
        });
}
