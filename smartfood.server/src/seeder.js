const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const FoodItem = require('./models/FoodItem');
const Recipe = require('./models/Recipe');
const FamilyGroup = require('./models/FamilyGroup');
const ShoppingList = require('./models/ShoppingList');

dotenv.config();

const users = [
  {
    username: 'admin',
    email: 'admin@gmail.com',
    password: '123456',
    role: 'admin'
  },
  {
    username: 'me',
    email: 'me@gmail.com',
    password: '123456',
    role: 'user'
  },
  {
    username: 'bo',
    email: 'bo@gmail.com',
    password: '123456',
    role: 'user'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany();
    await FoodItem.deleteMany();
    await Recipe.deleteMany();
    await FamilyGroup.deleteMany();
    await ShoppingList.deleteMany();
    console.log('Existing data cleared.');

    // Seed users
    // mongoose pre-save hook will automatically hash the passwords!
    const createdUsers = [];
    for (const u of users) {
      const userObj = new User(u);
      const savedUser = await userObj.save();
      createdUsers.push(savedUser);
    }
    console.log('Users seeded.');

    const adminUser = createdUsers[0];
    const meUser = createdUsers[1];
    const boUser = createdUsers[2];

    // Seed family group for me and bo
    const familyGroup = new FamilyGroup({
      name: 'Gia đình nhỏ',
      owner: meUser._id,
      members: [
        { user: meUser._id, role: 'admin' },
        { user: boUser._id, role: 'member' }
      ]
    });
    const savedFamilyGroup = await familyGroup.save();

    // Update family group IDs on users
    meUser.familyGroup = savedFamilyGroup._id;
    await meUser.save();
    boUser.familyGroup = savedFamilyGroup._id;
    await boUser.save();
    console.log('Family group seeded and users updated.');

    // Seed food items for meUser (some in fridge, freezer, etc.)
    const foodItems = [
      {
        user: meUser._id,
        name: 'Cà chua',
        quantity: 5,
        unit: 'cái',
        storageLocation: 'Tủ lạnh',
        category: 'Rau củ',
        expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5 days from now
      },
      {
        user: meUser._id,
        name: 'Thịt bò',
        quantity: 1,
        unit: 'kg',
        storageLocation: 'Tủ đông',
        category: 'Thịt cá',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      },
      {
        user: meUser._id,
        name: 'Trứng gà',
        quantity: 10,
        unit: 'cái',
        storageLocation: 'Tủ lạnh',
        category: 'Sữa & trứng',
        expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
      },
      {
        user: meUser._id,
        name: 'Sữa tươi',
        quantity: 2,
        unit: 'chai',
        storageLocation: 'Cửa tủ lạnh',
        category: 'Sữa & trứng',
        expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day from now (warning)
      },
      {
        user: meUser._id,
        name: 'Táo đỏ',
        quantity: 1.5,
        unit: 'kg',
        storageLocation: 'Ngăn rau củ',
        category: 'Rau củ',
        expiryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // Expired 2 days ago
      }
    ];
    await FoodItem.insertMany(foodItems);
    console.log('Food items seeded.');

    // Seed recipes
    const recipes = [
      {
        name: 'Trứng cuộn hành lá',
        description: 'Món trứng rán hành lá thơm ngon, dễ làm, giàu dinh dưỡng cho bữa sáng nhanh chóng.',
        ingredients: [
          { name: 'Trứng gà', quantity: 3, unit: 'cái' },
          { name: 'Hành lá', quantity: 2, unit: 'bó' }
        ],
        instructions: '1. Đập trứng vào bát và đánh đều với chút muối, mắm, tiêu.\n2. Hành lá rửa sạch, thái nhỏ rồi cho vào bát trứng trộn đều.\n3. Đun nóng chảo dầu, đổ trứng vào dàn đều chảo.\n4. Khi mặt dưới trứng chín vàng, nhẹ nhàng cuộn trứng lại.\n5. Cắt trứng cuộn thành từng khoanh vừa ăn và thưởng thức.',
        category: 'Món chính',
        cookTime: '10 phút',
        servings: 2,
        difficulty: 'Dễ',
        image: '🍳',
        user: adminUser._id
      },
      {
        name: 'Thịt bò xào cà chua',
        description: 'Món bò xào cà chua chua ngọt đậm đà, thịt bò mềm quyện sốt cà chua đưa cơm.',
        ingredients: [
          { name: 'Thịt bò', quantity: 300, unit: 'g' },
          { name: 'Cà chua', quantity: 2, unit: 'cái' }
        ],
        instructions: '1. Thịt bò thái mỏng, ướp với tỏi băm, hạt nêm, dầu hào trong 15 phút.\n2. Cà chua rửa sạch bổ múi cau.\n3. Phi thơm tỏi băm, cho thịt bò vào xào tái chín ở lửa lớn rồi trút ra đĩa riêng.\n4. Cho tiếp cà chua vào xào nhuyễn thành nước sốt.\n5. Đổ thịt bò vào đảo nhanh tay cùng nước sốt cà chua, nêm nếm gia vị vừa ăn rồi tắt bếp.',
        category: 'Món chính',
        cookTime: '20 phút',
        servings: 3,
        difficulty: 'Trung bình',
        image: '🥩',
        user: adminUser._id
      }
    ];
    await Recipe.insertMany(recipes);
    console.log('Recipes seeded.');

    // Seed a shopping list for meUser
    const shoppingList = new ShoppingList({
      name: 'Danh sách đi chợ cuối tuần',
      type: 'weekly',
      user: meUser._id,
      familyGroup: savedFamilyGroup._id,
      items: [
        { name: 'Bánh mì', quantity: 2, unit: 'cái', category: 'Đồ khô', isPurchased: false },
        { name: 'Hành lá', quantity: 1, unit: 'bó', category: 'Rau củ', isPurchased: true },
        { name: 'Bơ lạt', quantity: 1, unit: 'hộp', category: 'Sữa & trứng', isPurchased: false }
      ]
    });
    await shoppingList.save();
    console.log('Shopping lists seeded.');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
