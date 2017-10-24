angular.module('ayirp', ['ngMaterial'])
.controller("mainController",function($scope){
  $scope.saveBtn=false;
  $scope.menu = true;
  $scope.paint=function(){

   document.getElementById("noteContainer").style.display = "none";
    $scope.menu = false;
    window.painting =true;
    $scope.saveBtn=true;
  }
  $scope.draw=function(){
    $('#defaultCanvas1').css('display','none');
    window.play= false;
    window.painting =false;
    document.getElementById("noteContainer").style.display = "none";
    $scope.menu = false;
    new p5(paintingSketch);
  }
  $scope.play=function(){
    $('#defaultCanvas1').css('display','none');
    window.play= true;
    window.painting =false;
    document.getElementById("noteContainer").style.display = "none";
    $scope.menu = false;
    new p5(paintingSketch);
  }
})
