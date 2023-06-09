package com.innovators.Arangkada.Controller;


import org.springframework.http.MediaType;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import org.springframework.http.HttpHeaders;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.AbstractFileResolvingResource;
import org.springframework.core.io.AbstractResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.innovators.Arangkada.Entity.VehicleEntity;
import com.innovators.Arangkada.Entity.VehiclePictureEntity;
import com.innovators.Arangkada.Service.VehicleService;


@RestController
@RequestMapping("/vehicles")
@CrossOrigin
public class VehicleController {
	
	
		@Autowired
		VehicleService vserv;


		@PostMapping("/postVehicle")
		public VehicleEntity insertVehicle(@RequestBody VehicleEntity vehicle) {
			return vserv.insertVehicle(vehicle);
		}
	
		@GetMapping("/getAllVehicles")
		public List<VehicleEntity> getAllVehicle(){
			return vserv.getAllVehicle();
		}
	
		@GetMapping("/getByPlateNumber")
		public VehicleEntity findByPlateNumber(@RequestParam String plateNumber){
			return vserv.findByPlatenumber(plateNumber);
		}
		@GetMapping("/getByVehicleId/{vehicleId}")
		public Optional<VehicleEntity> findByVehicleId(@PathVariable int vehicleId){
			return vserv.findByVehicleId(vehicleId);
		}
		@GetMapping("/getByOperatorId/{operatorId}")
		public List<VehicleEntity> findByOperatorOperatorId(@PathVariable int operatorId){
			return vserv.findByOperatorOperatorId(operatorId);
		}
		@GetMapping("/getByVehicleType")
		public List<VehicleEntity> findByVehicleType(@RequestParam String vehicleType){
			return vserv.findByVehicleType(vehicleType);
		}
		@GetMapping("/getByIsRentedAndVehicleTypeAndVehicleCondition")
		public List<VehicleEntity> findByIsRentedAndVehicleTypeAndVehicleCondition(@RequestParam boolean isRented, @RequestParam String vehicleType, @RequestParam String vehicleCondition){
			return vserv.findByIsRentedAndVehicleTypeAndVehicleCondition(isRented, vehicleType, vehicleCondition);
		}
		
		@PutMapping("/putVehicleRented/{vehicleid}")
		public VehicleEntity putVehicleRented(@PathVariable int vehicleid, @RequestParam boolean rented) throws Exception {
			return vserv.putVehicleRented(vehicleid, rented);
		}
	
	
		@PutMapping("/putVehicle/{vehicleid}")
		public VehicleEntity putVehicle(@PathVariable int vehicleid, @RequestBody VehicleEntity newVehicleDetails) throws Exception{
			return vserv.putVehicle(vehicleid, newVehicleDetails);
		}
		@PutMapping("/putReason/{vehicleid}")
		public VehicleEntity putReason(@PathVariable int vehicleid, @RequestBody VehicleEntity newVehicleDetails) throws Exception{
				return vserv.putReason(vehicleid, newVehicleDetails);
		}
		@DeleteMapping ("/deleteVehicle/{vehicleId}") 
		public String deleteVehicle(@PathVariable int vehicleId) { 
			return vserv.deleteVehicle(vehicleId);
		}
	
		@PostMapping("/uploadPicture/{vehicleId}")
		public ResponseEntity<?> uploadPicture(@PathVariable int vehicleId, @RequestParam("image") MultipartFile file) {
		    try {
		        byte[] image = compressImage(file.getBytes()); // compressing the image before storing it
		        VehiclePictureEntity picture = new VehiclePictureEntity();
		        picture.setImage(image);
		        VehicleEntity vehicle = new VehicleEntity();
		        vehicle.setVehicleId(vehicleId);
		        picture.setVehicle(vehicle);
		        vserv.uploadPicture(picture);
		        return ResponseEntity.ok().build();
		    } catch (IOException e) {
		        e.printStackTrace();
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		    }
		}
		//upload multiple pictures
		@PostMapping("/uploadPictures/{vehicleId}")
		public ResponseEntity<?> uploadPictures(@PathVariable int vehicleId, @RequestParam("images") List<MultipartFile> images) {
		    try {
		        List<VehiclePictureEntity> pictures = new ArrayList<>();
		        for (MultipartFile file : images) {
		            byte[] image = compressImage(file.getBytes()); // compressing the image before storing it
		            VehiclePictureEntity picture = new VehiclePictureEntity();
		            picture.setImage(image);
		            VehicleEntity vehicle = new VehicleEntity();
		            vehicle.setVehicleId(vehicleId);
		            picture.setVehicle(vehicle);
		            pictures.add(picture);
		        }
		        vserv.uploadPictures(pictures);
		        return ResponseEntity.ok().build();
		    } catch (IOException e) {
		        e.printStackTrace();
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		    }
		}

		// return string / base64 this is correct 
//		@GetMapping("/getAllPictures/{vehicleId}/pictures")
//		public List<String> getAllPictures(@PathVariable int vehicleId) {
//		    return vserv.getAllPictures(vehicleId);
//		}
		@GetMapping("/getAllPictures/{vehicleId}/pictures")
		public List<Map<String, Object>> getAllPictures(@PathVariable int vehicleId) {
		    return vserv.getAllPictures(vehicleId);
		}

		// get the picture by picture ID
		@GetMapping("/getPictures/{vehicleId}/picture/{pictureId}")
		public ResponseEntity<byte[]> getPicture(@PathVariable int vehicleId, @PathVariable int pictureId) {
		    byte[] image = vserv.getPicture(vehicleId, pictureId);
		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.IMAGE_JPEG);
		    return new ResponseEntity<byte[]>(image, headers, HttpStatus.OK);
		}

		// method to compress the image data using the Java ImageIO API
		private byte[] compressImage(byte[] imageData) throws IOException {
			BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(imageData));
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			ImageIO.write(bufferedImage, "jpg", outputStream);
			return outputStream.toByteArray();
		}
		
		// Delete specific vehiclePicture
		@DeleteMapping("/deletePicture/{vehicleId}/picture/{pictureId}")
		public ResponseEntity<String> deletePicture(@PathVariable int vehicleId, @PathVariable int pictureId) {
		    try {
		        vserv.deletePicture(vehicleId, pictureId);
		        return ResponseEntity.ok("Picture " + pictureId + " successfully deleted");
		    } catch (IllegalArgumentException e) {
		        return ResponseEntity.badRequest().body(e.getMessage());
		    } catch (EntityNotFoundException e) {
		        return ResponseEntity.notFound().build();
		    }
		}
		
//		@DeleteMapping("/deletePicture/{vehicleId}/picture/{pictureId}")
//		public ResponseEntity<String> deletePicture(@PathVariable int vehicleId, @PathVariable int pictureId) {
//		    try {
//		        vserv.deletePicture(vehicleId, pictureId);
//		        return ResponseEntity.ok("Picture " + pictureId + " for vehicle " + vehicleId + " successfully deleted");
//		    } catch (IllegalArgumentException e) {
//		        return ResponseEntity.badRequest().body(e.getMessage());
//		    } catch (EntityNotFoundException e) {
//		        return ResponseEntity.notFound().build();
//		    }
//		}
	

}
