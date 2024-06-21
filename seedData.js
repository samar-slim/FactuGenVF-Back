const User = require("./models/userModel");
const Account = require("./models/accountModel");
const bcrypt = require("bcrypt");
const Config = require('./models/configModel')

const mongoose = require('mongoose');
const Template = require('./models/templateModel');

async function seedDatabase() {
  const templates = [
    {
      name: 'template3',
      FileName: 'template3',
      textColor: '#000000',
      headerColor: '#FF0000',
      bodyColor: '#FFFFFF',
    },
    {
      name: 'template2',
      FileName: 'template2',
      textColor: '#000000',
      headerColor: '#FF0000',
      bodyColor: '#FFFFFF',
    },
    {
      name: 'template1',
      FileName: 'template1',
      textColor: '#000000',
      headerColor: '#FF0000',
      bodyColor: '#FFFFFF',
    }
  ];

  for (const template of templates) {
    const existingTemplate = await Template.find({name :template.name});
    if (!existingTemplate) {
      await Template.create(template);

      //console.log(`Template ${template.name} created`);
    } else {
      //console.log(`Template ${template.name} already exists`);
    }
  }

  const userData = {
    nom: 'test',
    prenom: 'tesss',
    email: 'admin@admin.com',
    telephone: '237979325',
    pays: 'Tunisia',
    ville: 'ks',
    adresse: 'rue ',
    type: 'admin',
    adrEntreprise: 'rue de ',
    emailEntreprise: 'test11@test.com',
    nomEntreprise: 'test tesss',
    paysEntreprise: 'Tunisia',
    siretEntreprise: 'rwr',
    telEntreprise: '279791',
    tvaEntreprise: '11111',
  };

  const accountData = {
    accountIdentifier: 'admin@admin.com',
    accountType: 'admin',
    password: 'adminpassword', // This will be hashed automatically by the pre-save hook
    status: 'active',
    accountSettings: {
      notifications: true,
      privacy: 'public',
    },
  };

  
  try {
    let user = await User.findOne({ email: userData.email });

    if (!user) {
      user = new User(userData);
      await user.save();

    } else {
      console.log('User already exists:');

    }

    let account = await Account.findOne({ accountIdentifier: accountData.accountIdentifier });
    if (!account) {
      accountData.user = user._id; // Associate account with the created user
      account = new Account(accountData);
      await account.save();
      console.log('Account created:', account);
    } else {

      console.log('Account already exists:');

    }

    const defaultConfig = { backupTime: "0 0 * * *" };
    await Config.findOneAndUpdate(
            {}, // No filter, so it matches any document
            defaultConfig,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

    
  } catch (error) {
    console.error('Error seeding database:', error);
  }

}

module.exports = seedDatabase;