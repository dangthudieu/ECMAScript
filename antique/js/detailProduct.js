
// đường dẫn chi tiết sản phẩm 
const urldetail = new URLSearchParams(window.location.search);
const productId = urldetail.get('id');

// đường dẫn chi tiết danh mục 
const urlCategoriesProduct = new URLSearchParams(window.location.search);
const product_cate_id = urlCategoriesProduct.get('cate_id');

// danh sách theo danh mục
function categoriesTable(categories) {
    let html = '<div class="flex flex-col lg:flex-row gap-4 flex-wrap">';
    categories.forEach(data => {
        const countDescription = data.description.length > 20 ? data.description.slice(0, 20) + '...' : data.description;

        html += `
            <div class="flex-1 w-full lg:w-1/3 mb-6">
                <div class="m-5 rounded-xl px-4 py-6 sm:px-8 sm:py-10 tm-bg-brown" style="width: 230px; margin-bottom: 20px;">
                <a href="../client/detail.html?id=${data.id}">
                    <div class="lg:flex-row">
                        <div class="flex-1">
                            <img src="../uploads/img/${data.image}" alt="${data.name}" width="100%" class="rounded-md mb-4">
                        </div>
                        <div class="flex-1 ">
                            <h3 class="text-lg sm:text-xl mb-2 sm:mb-3 font-semibold text-center tm-text-yellow">${data.name}</h3>
                            <div class="text-md sm:text-lg text-white font-light mb-1"> ${data.price} VNĐ</div>
                            <div class="text-md sm:text-lg font-light">${countDescription}</div>
                        </div>
                    </div>
                    </a>
                </div>
            </div>`;
    });
    html += `</div>`;
    return html;
}

// hiển thị chi tiết sản phẩm 
function detailProduct(data) {
    let html = "";
    html += `
        <div class="flex items-start mb-6 tm-menu-item">
            <div class="flex-1 m-5 rounded-xl px-4 py-6 sm:px-8 sm:py-10 tm-bg-brown ">
                <div class="flex lg:flex-row">
                    <div class="flex-1">
                        <img src="../uploads/img/${data.image}" alt="Image" width="300px" class="rounded-md mr-8">
                    </div>
                    <div class="flex-1 py-5 sm:px-8 ml-8">
                        <h3 class="text-lg sm:text-xl mb-2 sm:mb-3 font-semibold text-center tm-text-yellow">${data.name}</h3>
                        <div class="text-white text-md sm:text-lg font-light mb-1"> ${data.price} VNĐ</div>
                        <div class="text-white text-md sm:text-lg fa-5x font-light">${data.description}</div>
                        <button class="m-5 tm-text-yellow border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-black font-bold uppercase px-8 py-3 rounded-full"
                        onclick="addToCart(${data.id}, '${data.name}','${data.image}', ${data.price}, cart)">
                    Thêm vào giỏ hàng
                </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return html;
}




let cart = [];
function addToCart(id, name, image, price) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    console.log("addToCart called with:", id, name, price, cart);

    const checkCart = cart.findIndex(item => item.id === id);
    if (checkCart !== -1) {
        cart[checkCart].quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            image: image,
            price: price,
            quantity: 1,
        });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = "../client/cart.html";
}

function CartDisplay() {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let html = '';

    cart.forEach((item, index) => {
        html += `
        <tr>
            <td>${index + 1}</td>
            <td>
                <img src="../uploads/img/${item.image}" alt="Image" width="100px" class="rounded-md mr-8">
            </td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>
                <button onclick="removeFromCart(${item.id})">Xóa</button>
            </td>
        </tr>
        `;
    });

    document.getElementById('cart-list').innerHTML = html;

    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = calculateTotalPrice(cart);
    totalPriceElement.textContent = `Tổng tiền: ${totalPrice} VNĐ`;
}

function calculateTotalPrice(cart) {
    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.quantity * item.price;
    });
    return totalPrice;
}

document.addEventListener('DOMContentLoaded', function () {
    CartDisplay();
});

function removeFromCart(id) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== id);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    CartDisplay();
}



// gửi thông tin khách hàng 
async function Order(OrderData) {
    const response = await fetch(API_URL + API_ORDER, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(OrderData),

    });
    return response.json();

}

//gửi thông tin chi tiết đơn hàng 
async function OrderDetail(id, cartData) {
    const CartResponse = await fetch(API_URL + API_ORDER_DETAIL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            order_id: id,
            order_detail: cartData,
        })
    });
    console.log('OrderDetail response:', await CartResponse.json());

}

async function PayCart() {
   
    const customerName = document.getElementById("customerName").value;
    const customerAddress = document.getElementById("customerAddress").value;
    const customerEmail = document.getElementById("customerEmail").value;
    const customerPhoneNumber = document.getElementById("customerPhoneNumber").value;

    if (!customerName || !customerAddress || !customerEmail || !customerPhoneNumber) {
        alert("Vui lòng nhập đầy đủ thông tin khách hàng.");
        return;
    }

    const orderData = {
        customer_name: customerName,
        customer_address: customerAddress,
        customer_email: customerEmail,
        customer_phone_number: customerPhoneNumber,
        created_date: new Date().toISOString(), // Lấy ngày hiện tại
        status: "Đang chờ",
    };

    const orderResponse = await Order(orderData);

    if (orderResponse) {
        // Nếu thông tin khách hàng được gửi thành công, tiếp tục gửi chi tiết giỏ hàng
        await OrderDetail(orderResponse.id, cart);
    }
}




// xữ lý đường dẫn danh sách theo danh mục
if (product_cate_id) {
    fetch(API_URL + API_PRODUCT + `?cate_id=${product_cate_id}`)
        .then(function (response) {
            response.json().then(function (data) {
                console.log(data);

                document.getElementById('product_categories_cate_id').innerHTML = categoriesTable(data)
            })
        })
}




// xữ lý đường dẫn chi tiết sản phẩm 
if (productId) {
    fetch(API_URL + API_PRODUCT + '/' + productId)
        .then(function (response) {
            response.json().then(function (data) {
                document.getElementById("detail_products").innerHTML = detailProduct(data);
            });
        })
        .catch(function (error) {
            console.error("Error fetching product details:", error);
        });
}
