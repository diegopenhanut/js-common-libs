MirnaInfoWidget.prototype.draw = InfoWidget.prototype.draw;
MirnaInfoWidget.prototype.render = InfoWidget.prototype.render;
MirnaInfoWidget.prototype.getTreePanel = InfoWidget.prototype.getTreePanel;
MirnaInfoWidget.prototype.checkDataTypes = InfoWidget.prototype.checkDataTypes;
MirnaInfoWidget.prototype.doGrid = InfoWidget.prototype.doGrid;
MirnaInfoWidget.prototype.getTranscriptTemplate = InfoWidget.prototype.getTranscriptTemplate;
MirnaInfoWidget.prototype.getGeneTemplate = InfoWidget.prototype.getGeneTemplate;


function MirnaInfoWidget(targetId, species, args){
	if (args == null){
		args = new Object();
	}
	args.title = "miRNA Information";
	InfoWidget.prototype.constructor.call(this, targetId, species, args);
};

MirnaInfoWidget.prototype.getdataTypes = function (){
	//Abstract method
	return dataTypes=[
	            { text: "Information", children: [
	                { text: "miRNA"},
	                { text: "Transcript"}, 
	                { text: "Gene"} 
	            ] },
	            { text: "Regulatory", children: [
  	                { text: "Target Genes"}
  	            ] },
  	            { text: "Disease", children: [
  	              { text: "Related Diseases"}
  	            ] }
	        ];
};
MirnaInfoWidget.prototype.optionClick = function (item){
	//Abstract method
	if (item.leaf){
		if(this.panel.getComponent(1)!=null){
			this.panel.getComponent(1).hide();
			this.panel.remove(1,false);
		}
		switch (item.text){
			case "miRNA":  this.panel.add(this.getMirnaPanel(this.data.mirna).show()); break;
			case "Transcript": this.panel.add(this.getTranscriptPanel(this.data.transcripts).show()); break;
			case "Gene": this.panel.add(this.getGenePanel(this.data.genes).show()); break;
			case "Target Genes": this.panel.add(this.getTargetGenesGrid(this.data.targetGenes).show()); break;
			case "Related Diseases": this.panel.add(this.getMirnaDiseasesGrid(this.data.mirnaDiseases).show()); break;
		}
	}
};

MirnaInfoWidget.prototype.getMirnaPanel = function(data){
    if(this.mirnaPanel==null){
    	
    	console.log(data);
    	
    	var tplMature = this.getMirnaMatureTemplate();
    	var tplGene = this.getMirnaGeneTemplate();

    	var panels = [];
    	for ( var i = 0; i < data.mirnaMature.length; i++) {
			var maturePan = Ext.create('Ext.panel.Panel',{
		        border:false,
				bodyPadding:5,
				data:data.mirnaMature[i],
				tpl:tplMature
			});
			panels.push(maturePan);
    	}
    	
    	for ( var i = 0; i < data.mirnaGenes.length; i++) {
			var genePan = Ext.create('Ext.panel.Panel',{
		        border:false,
				bodyPadding:5,
				data:data.mirnaGenes[i],
				tpl:tplGene
			});
			panels.push(genePan);
    	}
		this.mirnaPanel = Ext.create('Ext.panel.Panel',{
			title:"miRNA",
			border:false,
			cls:'panel-border-left',
			flex:3,    
			bodyPadding:5,
			autoScroll:true,
			items:panels
		});
    }
    return this.mirnaPanel;
};


MirnaInfoWidget.prototype.getTranscriptPanel = function(data){
    if(this.transcriptGrid==null){
    	
    	var tpl = this.getTranscriptTemplate();
    	
    	var panels = [];
    	for ( var i = 0; i < data.length; i++) {	
			var transcriptPanel = Ext.create('Ext.panel.Panel',{
		        border:false,
				bodyPadding:5,
				data:data[i],
				tpl:tpl
			});
			panels.push(transcriptPanel);
    	}
		this.transcriptGrid = Ext.create('Ext.panel.Panel',{
			title:"Transcripts ("+i+")",
			border:false,
			cls:'panel-border-left',
			flex:3,    
			bodyPadding:5,
			autoScroll:true,
			items:panels
		});
    }
    return this.transcriptGrid;
};

MirnaInfoWidget.prototype.getGenePanel = function(data){
    if(this.genePanel==null){
    	
    	var tpl = this.getGeneTemplate();
    	
    	var panels = [];
    	for ( var i = 0; i < data.length; i++) {	
			var genePan = Ext.create('Ext.panel.Panel',{
		        border:false,
				bodyPadding:5,
				data:data[i],
				tpl:tpl
			});
			panels.push(genePan);
    	}
		this.genePanel = Ext.create('Ext.panel.Panel',{
			title:"Genes ("+i+")",
			border:false,
			cls:'panel-border-left',
			flex:3,    
			bodyPadding:5,
			autoScroll:true,
			items:panels
		});
    }
    return this.genePanel;
};

MirnaInfoWidget.prototype.getTargetGenesGrid = function(data){
    if(this.targetGenesGrid==null){
//    	console.log(data);
    	
    	if(data.length<=0){
    		this.targetGenesGrid= Ext.create('Ext.panel.Panel',{
    			cls:'panel-border-left',
    			border:false,
    			flex:3,
    			bodyPadding:'40',
    			html:'No results found'
    		});
    	}else{
    		var groupField = '';
    		var modelName = "targetGenes";
    		var fields = ['externalName','stableId','biotype','chromosome','start','end','strand','description'];
    		var columns = [
    		               {header : 'Name',dataIndex: 'externalName',flex:1},
    		               {header : 'Stable Id',dataIndex: 'stableId',flex:2},
    		               {header : 'Biotype',dataIndex: 'biotype',flex:1.5},
    		               {header : 'Chr',dataIndex: 'chromosome',flex:0.5},
    		               {header : 'Start',dataIndex: 'start',flex:1},
    		               {header : 'End',dataIndex: 'end',flex:1},
    		               {header : 'Strand',dataIndex: 'strand',flex:0.5},
    		               {header : 'Description',dataIndex: 'description',flex:1}
    		               ];
    		this.targetGenesGrid = this.doGrid(columns,fields,modelName,groupField);
    		this.targetGenesGrid.store.loadData(data);
    	}
    }
    return this.targetGenesGrid;
};

MirnaInfoWidget.prototype.getMirnaDiseasesGrid = function(data){
    if(this.mirnaDiseasesGrid==null){
//    	console.log(data);
    	
    	if(data.length<=0){
    		this.mirnaDiseasesGrid= Ext.create('Ext.panel.Panel',{
    			cls:'panel-border-left',
    			border:false,
    			flex:3,
    			bodyPadding:'40',
    			html:'No results found'
    		});
    	}else{
    		var groupField = '';
    		var modelName = "mirnaDiseases";
    		var fields = ['mirnaDiseaseId','mirnaGene','mirbaseId','diseaseName','pubmedId','description'];
    		var columns = [
    		               {header : 'Name',dataIndex: 'mirbaseId',flex:1.5},
    		               {header : 'Disease',dataIndex: 'diseaseName',flex:1.5},
    		               {header : 'PubMed id',dataIndex: 'pubmedId',flex:1},
    		               {header : 'Description',dataIndex: 'description',flex:3}
    		               ];
    		this.mirnaDiseasesGrid = this.doGrid(columns,fields,modelName,groupField);
    		this.mirnaDiseasesGrid.store.loadData(data);
    	}
    }
    return this.mirnaDiseasesGrid;
};


MirnaInfoWidget.prototype.getData = function (){
	var _this = this;
	this.panel.disable();
	this.panel.setLoading("Getting information...");
//	category, subcategory, query, resource, callbackFunction
	var cellBaseDataAdapter = new CellBaseDataAdapter(this.species);
	cellBaseDataAdapter.successed.addEventListener(function (evt){
		_this.dataReceived(cellBaseDataAdapter.toJSON());
	});
	cellBaseDataAdapter.fill("regulatory","mirna_mature", this.feature.getName(), "fullinfo");
	console.log(this.feature.getName());
};
MirnaInfoWidget.prototype.dataReceived = function (data){
	var parseData = JSON.parse(data);
	this.data=parseData[0];
	this.optionClick({"text":"miRNA","leaf":"true"});
	this.panel.enable();
	this.panel.setLoading(false);
};

MirnaInfoWidget.prototype.getMirnaMatureTemplate = function (){
	return new Ext.XTemplate(
			 '<p><span class="panel-border-bottom"><span class="ssel s130">miRNA mature</span> &nbsp; <span class="emph s120"> {mirbaseId} </span></span></p>',
			 '<br>',
			 '<p><span class="w140 dis s90">miRBase Accession: </span> <span class="">{mirbaseAcc}</span></p>',
			 '<span class="w140 dis s90">Sequence: </span> <span class="">{sequence}</span>'
		);
};

MirnaInfoWidget.prototype.getMirnaGeneTemplate = function (){
	return new Ext.XTemplate(
			 '<p><span class="panel-border-bottom"><span class="ssel s130">miRNA gene</span> &nbsp; <span class="emph s120"> {mirbaseId} </span></span></p>',
			 '<br>',
			 '<p><span class="w140 dis s90">miRBase Accession: </span> <span class="">{mirbaseAcc}</span></p>',
			 '<span class="w140 dis s90">Sequence: </span> <span class="">{sequence}</span>',
			 '<p><span class="w140 dis s90">Status: </span> <span class="">{status}</span></p>'
		);
};

