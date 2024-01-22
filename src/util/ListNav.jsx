import React from "react";

export  function TabletList() {
  const list = [
    { title: "Apple iPad", largura: '1024', altura: '768' },
    { title: "Samsung Galaxy Tab 7", largura: '1024', altura: '500' },
    { title: "Samsung Galaxy Tab", largura: '1280', altura: '800' },
  ];

  return list;
}

export  function MobileList() {
    const list = [
      { title: "Apple iPhone 6/7", largura: '375', altura: '667' },
      { title: "Apple iPhone X", largura: '375', altura: '812' },
      { title: "Samsung Galaxy S2", largura: '320', altura: '533' },
    ];
  
    return list;
  }
  
  
