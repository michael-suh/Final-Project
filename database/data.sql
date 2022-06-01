insert into "users" ("userId", "username", "email", "hashedPassword", "phoneNumber", "location")
values (1, 'demouser', 'demo@demo.com', 'demouser', '+19991112222', 'Irvine, CA')
returning *;


insert into "items" ("title", "price", "fileUrl", "userId", "content", "uploadedAt")
values ('Off-White Marilyn Monroe T-Shirt', 13000, '/images/offwhite-marilyn.jpeg', 1, 'Barely worn t-shirt in great condition. Fits like large', now()),
      ('Off-White Caution Tape T-Shirt', 13000, '/images/offwhite-caution.jpeg', 1, 'Barely worn t-shirt in great condition. Fits like large', now()),
      ('Thom Browne Logo T-Shirt', 10000, '/images/thombrowne.jpeg', 1, 'Thom browne logo t-shirt. Fits like medium', now()),
      ('Comme Des Garcons Logo T-Shirt', 8000, '/images/cdg-black.jpeg', 1, 'CDG t-shirt in great condition. Size XL but fits like medium', now())
returning *;
