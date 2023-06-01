window.globalConfig = {
	projectId: 50,
	contextpath:'',
	url: '/',
	pythonapiRoot: '',
	apiRoot: '',
	
	airflowUrl: '',
	s3BaseUrl: '',
	envName: 'AI Marketplace',
	LDAPGroups: {
		'Admin': ['LightHouse-Admin', 'Admin', 'ADMIN', 'LH-Admin', 'LH-Admin01', 'LH-Admin02'],
		'Executive': ['Executive', 'LightHouse-Executive', 'LH-Executive', 'EXECUTIVE'],
		'Data Scientist': ['Data Scientist', 'LH-Data Scientist', 'Analyst', 'ANALYST'],
		'Data Engineering': ['Data Engineering'],
    },
    SSO:'',
	LOGO:"",
	HeaderDomainBased:false,					//SI-262 SOI Header Configuration 
	
	language_translator:true,
	StaticMRM:true,
	
	HeaderAcceptType: null, // Setting Header Accept Type Value For Api Call in Risk360
	GatewayBased: false, // Combining Headerbar(Home), sidebar(submenu) - BK and LS
	
};
