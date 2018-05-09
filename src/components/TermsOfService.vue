<template>
	<div style="margin-top:100px;">
		<Group>
   			<cell class="sub_item" title="筑家APP 用户服务协议" link="/" @cell-font-size="12"></cell>
   			<cell class="sub_item" title="法律声明及隐私权政策" link="/"></cell>
		</Group>
	</div>
</template>






<script>
	import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
	export default {
	    components: {
	    	Group,
	    	Cell
	    }
	}
</script>

<style>
    .sub_item{
    	height:60px;
    }
    .vux-label{
    	font-size:28px;
    }
    .weui-cell_access .weui-cell__ft:after{
	    content: " ";
	    display: inline-block;
	    height: 12px !important;
	    width: 12px !important;
	    border-width: 2px 2px 0 0;
	    border-color: #C8C8CD;
	    border-style: solid;
	    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	    position: relative;
	    top: -2px;
	    position: absolute;
	    top: 50%;
	    margin-top: -4px;
	    right: 2px;
	}
</style>