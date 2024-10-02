exports.BASEURL = process.env.BASE_URL + "v3/";

exports.ADMINPANELROOT = this.BASEURL + "admin";

exports.guestUserEmail = "guest@onestop.swc.iitg.ac.in";
exports.guestUserName = "Guest";
exports.guestUserRollNo = "2110000000";

exports.opiMailRecipients = [];
exports.opiStartDate = "2024-09-28";
exports.opiEndDate = "2024-10-01";

exports.adminRoles = ["super", "board", "mmc", "hmc", "club"];


exports.allIITGHostelsGC = [
  "Brahmaputra",
  "Kameng",
  "Dihing",
  "Barak",
  "Kapili",
  "Lohit",
  "Manas",
  "Married Scholars (Men)",
  "Married Scholars (Women)",
  "Siang",
  "Subansiri",
  "Umiam",
  "Dhansiri",
  "Disang (Men)",
  "Disang (Women)",
];
//exports.allIITGHostels = ["Brahmaputra","Kameng","Dihing","Barak","Kapili","Lohit","Manas","Married Scholars","Siang","Subansiri","Umiam","Dhansiri","Disang"];
exports.allIITGWomenHostels = [
  "Married Scholars (Women)",
  "Subansiri",
  "Dhansiri",
  "Disang (Women)",
];
exports.allIITGTechClubs = [
  "Coding Club",
  "CnA Club",
  "E-Cell",
  "Robotics Club",
  "Aeromodelling Club",
  "Automobile Club",
  "Electronics Club",
  "IITG.AI",
  "Gamedev and ESports",
  "Equinox",
  "FEC",
  "Whitespace",
  "Acumen",
  "4i Labs",
];
exports.allIITGWelfareClubs = [
  "Academic Initiatives Club",
  "Rights and Responsibilities Club",
  "Red Ribbon Club",
  "Youth Empowerment Club",
  "Saathi",
  "Social Service Club",
  "Substance Abuse Awareness Club",
];
exports.allIITGHostels = [
  "LOHIT",
  "BRAHMAPUTRA",
  "DISANG",
  "KAMENG",
  "BARAK",
  "MANAS",
  "DIHING",
  "UMIAM",
  "SIANG",
  "KAPILI",
  "DHANSIRI",
  "SUBANSIRI",
  "MSH",
  "GAURANG",
  "DIBANG",
  "NON-HOSTELLER",
];
exports.allIITGGymkhanaBoards = {
  "Sports Board": "sportsec@iitg.ac.in",
  "Students Web Committee (SWC)": "swc@iitg.ac.in",
  "Students Academic Board (SAB)": "sab@iitg.ac.in",
  "Technical Board": "techsec@iitg.ac.in",
  "Cultural Board": "cultsec@iitg.ac.in",
  "Welfare Board": "gensec_welfare@iitg.ac.in",
  "Student Alumni Interaction Linkage (SAIL)": "sail@iitg.ac.in",
  "Vice President, Students Gymkhana": "vp@iitg.ac.in",
};

exports.IITGAdminDepts = {
  Maintainence: "Grp_sgc_maintenance@iitg.ac.in",
  Services: "Grp_sgc_eug@iitg.ac.in",
  Finance: "Grp_sgc_finance@iitg.ac.in",
  Academic: "Grp_sgc_academic@iitg.ac.in",
  "Rights and Responsiblities": "Grp_sgc_rnr@iitg.ac.in",
  "RTI (Right to Information)": "Grp_sgc_steering@iitg.ac.in",
  "Medical Related Issues": "Grp_sgc_mug@iitg.ac.in",
};

exports.miscellaneousRecievers = [];

exports.totalSpardhaWomenPoints = 190;
exports.totalSpardhaMenPoints = 230;
exports.totalKritiPoints = 5800;
exports.totalSahyogPoints = 4400;
exports.totalManthanPoints = 1400;

exports.NotificationCategories = {
  lost: "lost",
  found: "found",
  buy: "buy",
  sell: "sell",
  cabSharing: "cabSharing",
  announcement: "announcement",
};

exports.defaultNotifCategoriesMap = {
  lost: true,
  found: true,
  buy: true,
  sell: true,
  cabSharing: true,
  announcement: true,
};
exports.messCapacityChanging = {
  "LOHIT": 100,
  "BRAHMAPUTRA": 100,
  "DISANG": 100,
  "KAMENG": 100,
  "BARAK": 100,
  "MANAS": 100,
  "DIHING": 100,
  "UMIAM": 100,
  "SIANG": 100,
  "KAPILI": 100,
  "DHANSIRI": 100,
  "SUBANSIRI": 100,
  "MSH": 100,
  "GAURANG": 100,
 "DIBANG": 100,
};

exports.sendToAllFirebaseTopicName = "all";
