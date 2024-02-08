
let API_URL = "http://localhost:3000/";
let API_PRODUCT = 'products/';

// sản phẩm admin


function productsTable(data) {
    let html = "";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const statusText = element.status == 1 ? "Hiển thị" : "ẩn";
        html += `
        <tr>
            <td>
                <span class="text-secondary ml-5 text-xs font-weight-bold">${i + 1}</span>
            </td>
            <input type="hidden" id="id" name="id" value="${element.id}"/>
            <td>
                <div class="d-flex px-2 py-1">  
                    <div>
                        <img src="../../uploads/img/${element.image}" class="avatar avatar-sm me-3" alt="user1">
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">${element.name}</h6>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-xs text-center font-weight-bold mb-0">${element.price} VNĐ</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">${statusText}</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">${element.addDate}</span>
            </td>
            <td class="align-middle">
            <a href="#" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" onclick="editProduct(${element.id})" data-original-title="Edit user">
                Edit
            </a> 
            </td>
            <td class="align-middle">
            <a href="#" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" onclick="deleteProductId(${element.id})" data-original-title="Delete">
            Delete
        </a>
                    </td>
            <td></td>
        </tr>`;
    }

    return html;
}

function editProduct(productId) {
    window.location.href = `../pages/edit_product.html?id=${productId}  `;
}


function deleteProductId(id) {
    if (confirm("Bạn chắc xóa chứ!")) {
        deleteProduct(id);
    }
}

function deleteProduct(id) {
    axios.delete(API_URL + API_PRODUCT + id)
        .then(response => {
            window.location.href = "../pages/tables.html";
        })
        .catch(error => {
            console.error("Lỗi khi xóa sản phẩm", error);
        });
}

async function fetchAPI() {
    try {
        const response = await fetch(API_URL + API_PRODUCT);
        const data = await response.json();
        document.getElementById("products_admin").innerHTML = productsTable(data);
    } catch (error) {
        console.error("không fecth được data:", error);
    }
}





//thêm sản phẩm vào admin
function addProduct() {

    //tạo hàm date tự động cho form nhập
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formatDate = `${day}/${month}/${year}`

    const id = Math.random(0, 9999).toString();
    const name = document.getElementById("name").value;
    const cate_id = document.getElementById("cate_id").value;
    const price = document.getElementById("price").value;

    const image = document.getElementById("image").value;
    const description = document.getElementById("description").value;
    const addDate = formatDate;
    const status = document.getElementById("status").value;


    // bắt lỗi chung 
    if (!name || !cate_id || !price || !description || !addDate || !status) {
        alert("Vui lòng nhập đầy đủ form có *.");
        return false;
    }

    //tạo 1 ofject chứ các thông tin valeu nhập từ form 
    const newProduct = {
        "id": id,
        "name": name,
        "cate_id": cate_id,
        "price": price,
        "image": image,
        "description": description,
        "addDate": addDate,
        "status": status,
    };
    axios.post(API_URL + API_PRODUCT, newProduct)
        .then(function (response) {
            window.location.href = '../pages/tables.html';
        })
        .catch(function (error) {
            alert('Không thể thểm sản phẩm', error)
        })

}



fetchAPI()