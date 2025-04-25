$(document).ready(() => {
    // Initial setup
    $("#empty-cart").show();
    $(".toggleButton").hide();
    $("#total-order-container").addClass("hidden");
    $(".Total-order-output").hide();
    $(".popUp").hide();
  
    let cart = {};
  
    const products = {
      Waffle: {
        name: "Waffle with Berries",
        price: 6.5,
        image: "assets/images/image-waffle-desktop.jpg",
      },
      VanillaBean: {
        name: "Vanilla Bean Crème Brûlée",
        price: 7.0,
        image: "assets/images/image-creme-brulee-desktop.jpg",
      },
      Macaron: {
        name: "Macaron Mix of Five",
        price: 8.0,
        image: "assets/images/image-macaron-desktop.jpg",
      },
      Tiramisu: {
        name: "Classic Tiramisu",
        price: 5.5,
        image: "assets/images/image-tiramisu-desktop.jpg",
      },
      Pistachio: {
        name: "Pistachio Baklava",
        price: 4.0,
        image: "assets/images/image-baklava-desktop.jpg",
      },
      Meringue: {
        name: "Lemon Meringue Pie",
        price: 5.0,
        image: "assets/images/image-meringue-desktop.jpg",
      },
      VelvetCake: {
        name: "Red Velvet Cake",
        price: 4.5,
        image: "assets/images/image-cake-desktop.jpg",
      },
      Brownie: {
        name: "Salted Caramel Brownie",
        price: 5.5,
        image: "assets/images/image-brownie-desktop.jpg",
      },
      VanillaPanna: {
        name: "Vanilla Panna Cotta",
        price: 6.5,
        image: "assets/images/image-panna-cotta-desktop.jpg",
      },
    };
  
    function updateCart() {
      const cartItems = $("#ordered-product");
      cartItems.empty();
  
      let totalItems = 0;
      let totalPrice = 0;
  
      for (let product in cart) {
        if (cart[product] > 0) {
          const itemTotal = cart[product] * products[product].price;
          totalItems += cart[product];
          totalPrice += itemTotal;
  
          cartItems.append(`
            <div class="close-button button-${product} active">
              <div class="cart-order" id="${product}-Product">
                <p>${products[product].name}</p>
                <div class="amount-container">
                  <div>
                    <span class="num num-order-${product}">${cart[product]}</span>
                    <span class="num">x</span>
                  </div>
                  <span class="amount">$${products[product].price.toFixed(
                    2
                  )}</span>
                  <span class="total-amount-${product}">$${itemTotal.toFixed(
            2
          )}</span>
                </div>
              </div>
              <img class="remove-item" src="assets/images/icon-remove-item.svg" alt="remove item" data-product="${product}">
            </div>
          `);
        }
      }
  
      $("#cart-num").text(totalItems);
      $("#total-order-container span").text(`$${totalPrice.toFixed(2)}`);
  
      if (totalItems > 0) {
        $("#empty-cart").hide();
        $("#total-order-container").removeClass("hidden");
        $(".Total-order-output").show();
      } else {
        $("#empty-cart").show();
        $("#total-order-container").addClass("hidden");
        $(".Total-order-output").hide();
      }
    }
  
    function updateConfirmedItems() {
      const confirmedItems = $(".confirmed-items");
      confirmedItems.empty();
  
      let totalPrice = 0;
  
      for (let product in cart) {
        if (cart[product] > 0) {
          const itemTotal = cart[product] * products[product].price;
          totalPrice += itemTotal;
  
          confirmedItems.append(`
            <div class="confirmed-item">
              <div class="item-details">
                <img src="${products[product].image}" alt="${
            products[product].name
          }" class="confirmed-image">
                <div class="item-info">
                  <p class="item-name">${products[product].name}</p>
                  <div class="item-pricing">
                    <span class="quantity">${cart[product]}x</span>
                    <span class="price">@ $${products[product].price.toFixed(
                      2
                    )}</span>
                  </div>
                </div>
              </div>
              <span class="item-total">$${itemTotal.toFixed(2)}</span>
            </div>
          `);
        }
      }
  
      confirmedItems.append(`
        <div class="confirmed-total">
          <p>Total Order</p>
          <span>$${totalPrice.toFixed(2)}</span>
        </div>
      `);
    }
  
    // Handle cart button clicks
    $(".cart-btn").click(function () {
      const classList = $(this).attr("class").split(" ");
      const productClass = classList.find((cls) => cls.startsWith("btn-"));
      const product = productClass.replace("btn-", "").replace(/-/g, "");
  
      $(this).hide();
      $(this).siblings(".toggleButton").show();
      $(".Total-order-output").show();
  
      $(this)
        .closest(
          ".waffle, .VanillaBean, .macaron, .Tiramisu, .pistachio, .Meringue, .VelvetCake, .Brownie, .VanillaPanna"
        )
        .find(".gallery-item img")
        .css("border", "2px solid hsl(14, 86%, 42%)");
  
      cart[product] = (cart[product] || 0) + 1;
      $(`.num-${product}`).text(cart[product]);
      updateCart();
    });
  
    // Plus button
    $(".plus").click(function () {
      const product = $(this)
        .parent()
        .attr("class")
        .split(" ")[1]
        .replace("btn-", "")
        .replace(/-/g, "");
      cart[product] = (cart[product] || 0) + 1;
      $(`.num-${product}`).text(cart[product]);
      updateCart();
    });
  
    // Minus button
    $(".minus").click(function () {
      const product = $(this)
        .parent()
        .attr("class")
        .split(" ")[1]
        .replace("btn-", "")
        .replace(/-/g, "");
      if (cart[product] && cart[product] > 1) {
        cart[product]--;
        $(`.num-${product}`).text(cart[product]);   
        updateCart();
      }
    });
  
    // Remove item
    $(document).on("click", ".remove-item", function () {
      const product = $(this).data("product");
      cart[product] = 0;
      $(`.num-${product}`).text(0);
  
      const $productContainer = $(`.btn-${product}`).closest(
        ".waffle, .VanillaBean, .macaron, .Tiramisu, .pistachio, .Meringue, .VelvetCake, .Brownie, .VanillaPanna"
      );
      $productContainer.find(".gallery-item img").css("border", "none");
  
      $(`.btn-$("product")`).show();
      $(`.btn-$("product")`).siblings(".toggleButton").hide();
      updateCart();
    });
  
    // Confirm order
    $("#submit").click(() => {
      if (Object.keys(cart).length > 0) {
        $(".popUp").show();
        $(".confirmed-order").addClass("open-popup");
        updateConfirmedItems();
  
        // Add light dark background color
        $("body").addClass("blur");
      }
    });
  
    // Start new order - also remove the background color when starting new order
    $("#btn").click(() => {
      $(".Total-order-output").css("backgroundColor", "");
      $(".product-list").css("backgroundColor", "");
      location.reload();
    });
  });