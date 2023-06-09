package com.innovators.Arangkada.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.innovators.Arangkada.Entity.VehicleEntity;
import com.innovators.Arangkada.Entity.VehiclePictureEntity;
import com.innovators.Arangkada.Repository.VehiclePictureEntityRepository;
import com.innovators.Arangkada.Repository.VehicleRepository;

import java.awt.Image;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.*;

import javax.imageio.ImageIO;
import javax.persistence.Column;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

@Service
public class VehicleService {
	
		
		@Autowired
		private VehiclePictureEntityRepository vpRepo;
		 
		@Autowired
	    private EntityManager entityManager;
		
		@Autowired
		VehicleRepository vrepo;
		
		@Autowired
		public VehicleEntity insertVehicle(VehicleEntity vehicle) {
			return vrepo.save(vehicle);
		}
	
		public List<VehicleEntity> getAllVehicle(){
			return vrepo.findAll();
		}
		
		public VehicleEntity findByPlatenumber(String plateNumber){
			if (vrepo.findByPlateNumber(plateNumber) !=null)
				return vrepo.findByPlateNumber(plateNumber);
			else 
				return null;
		}
		public Optional<VehicleEntity> findByVehicleId(int vehicleId){
			if (vrepo.findById(vehicleId) !=null)
				return vrepo.findById(vehicleId);
			else 
				return null;
		}
		public List<VehicleEntity> findByOperatorOperatorId(int operatorId){
			if (vrepo.findByOperatorOperatorId(operatorId) !=null)
				return vrepo.findByOperatorOperatorId(operatorId);
			else 
				return null;
		}
		public List<VehicleEntity> findByVehicleType(String vehicleType){
			if (vrepo.findByVehicleType(vehicleType) !=null)
				return vrepo.findByVehicleType(vehicleType);
			else 
				return null;
		}
		public List<VehicleEntity> findByIsRentedAndVehicleTypeAndVehicleCondition(boolean isRented, String vehicleType, String vehicleCondition){
			if (vrepo.findByIsRentedAndVehicleTypeAndVehicleCondition(isRented, vehicleType, vehicleCondition) !=null)
				return vrepo.findByIsRentedAndVehicleTypeAndVehicleCondition(isRented, vehicleType, vehicleCondition);
			else 
				return null;
		}
	// ORIGINAL 
//	public VehicleEntity putVehicleRented(int vehicleid, boolean rented) throws Exception {
//		VehicleEntity vehicle = new VehicleEntity();
//		try {
//			vehicle = vrepo.findById(vehicleid).get();
//			vehicle.setRented(rented);
//			return vrepo.save(vehicle);
//		}
//		catch(NoSuchElementException nex) {
//			throw new Exception("ID Number "+vehicleid+" does not exist!");
//		}
//	}
//	
//	
//	public VehicleEntity putVehicle(int vehicleId, VehicleEntity newVehicleDetails) throws Exception{
//		VehicleEntity vehicle = new VehicleEntity();
//		try {
//			vehicle = vrepo.findById(vehicleId).get();
//			vehicle.setRoute(newVehicleDetails.getRoute());
//			vehicle.setOrStatus(newVehicleDetails.getOrStatus());
//			vehicle.setVehicleCondition(newVehicleDetails.getVehicleCondition());
//			vehicle.setRentalFee(newVehicleDetails.getRentalFee());
//			return vrepo.save(vehicle);
//		}
//		catch(NoSuchElementException nex) {
//			throw new Exception("ID Number "+vehicleId+" does not exist!");
//		}
//	}
//	public VehicleEntity putReason(int vehicleId, VehicleEntity newVehicleDetails) throws Exception{
//		VehicleEntity vehicle = new VehicleEntity();
//		try {
//			vehicle = vrepo.findById(vehicleId).get();
//			vehicle.setDeletionReason(newVehicleDetails.getDeletionReason());
//			return vrepo.save(vehicle);
//		}
//		catch(NoSuchElementException nex) {
//			throw new Exception("ID Number "+vehicleId+" does not exist!");
//		}
//	}
//	
		public VehicleEntity putVehicleRented(int vehicleid, boolean rented) throws Exception {
		    try {
		        Optional<VehicleEntity> optionalVehicle = vrepo.findById(vehicleid);
		        if (optionalVehicle.isPresent()) {
		            VehicleEntity vehicle = optionalVehicle.get();
		            vehicle.setRented(rented);
		            return vrepo.save(vehicle);
		        } else {
		            throw new Exception("ID Number "+vehicleid+" does not exist!");
		        }
		    }
		    catch(NoSuchElementException nex) {
		        throw new Exception("ID Number "+vehicleid+" does not exist!");
		    }
		}
		public VehicleEntity putReason(int vehicleId, VehicleEntity newVehicleDetails) throws Exception {
		    try {
		        VehicleEntity vehicle = vrepo.findById(vehicleId).orElseThrow(() ->
		            new NoSuchElementException("ID Number " + vehicleId + " does not exist!"));
		        vehicle.setDeletionReason(newVehicleDetails.getDeletionReason());
		        return vrepo.save(vehicle);
		    } catch (NoSuchElementException nex) {
		        throw new Exception("ID Number " + vehicleId + " does not exist!");
		    }
		}
	
		public VehicleEntity putVehicle(int vehicleId, VehicleEntity newVehicleDetails) throws Exception {
		    try {
		        VehicleEntity vehicle = vrepo.findById(vehicleId).orElseThrow(() ->
		            new NoSuchElementException("ID Number " + vehicleId + " does not exist!"));
		        vehicle.setRoute(newVehicleDetails.getRoute());
		        vehicle.setOrStatus(newVehicleDetails.getOrStatus());
		        vehicle.setVehicleCondition(newVehicleDetails.getVehicleCondition());
		        vehicle.setRentalFee(newVehicleDetails.getRentalFee());
		        return vrepo.save(vehicle);
		    } catch (NoSuchElementException nex) {
		        throw new Exception("ID Number " + vehicleId + " does not exist!");
		    }
		}
		
		public String deleteVehicle(int vehicleId) {
			String msg;
			if(vrepo.findById(vehicleId).orElse(null) !=null) { 
				vrepo.deleteById(vehicleId); 
				msg= "Vehicle ID Number " + vehicleId + " is successfully deleted!";
			}
			else {
				msg= "Vehicle ID Number " + vehicleId + " is NOT found!";
			}
			return msg;
		}

		// Updated Picture using blob
		public void uploadPicture(VehiclePictureEntity picture) {
			String msg;
		    VehicleEntity vehicle = vrepo.findById(picture.getVehicle().getVehicleId())
		        .orElseThrow(() -> new EntityNotFoundException("Vehicle not found"));
		    picture.setVehicle(vehicle);
		    vpRepo.save(picture);
		    msg= "Picture successfully uploaded";
		}
		
		// upload multiple pictures
		public void uploadPictures(List<VehiclePictureEntity> pictures) {
			String msg;
		    List<VehicleEntity> vehicles = new ArrayList<>();
		    for (VehiclePictureEntity picture : pictures) {
		        VehicleEntity vehicle = vrepo.findById(picture.getVehicle().getVehicleId())
		                .orElseThrow(() -> new EntityNotFoundException("Vehicle not found"));
		        picture.setVehicle(vehicle);
		        vehicles.add(vehicle);
		    }
		    vpRepo.saveAll(pictures);
		    vrepo.saveAll(vehicles);
		    msg= "Pictures successfully uploaded";
		}
//This is correct getAllPicture without returning pictureId
//		public List<String> getAllPictures(int vehicleId) {
//		    List<VehiclePictureEntity> pictures = vpRepo.findByVehicleVehicleId(vehicleId);
//		    List<String> images = new ArrayList<>();
//		    for (VehiclePictureEntity picture : pictures) {
//		        try {
//		            byte[] imageData = picture.getImage();
//		            String base64Image = Base64.getEncoder().encodeToString(imageData);
//		            images.add(base64Image);
//		        } catch (Exception e) {
//		            throw new RuntimeException("Failed to read picture data", e);
//		        }
//		    }
//		    return images;
//		}

		//Get pictures by pictureID
		public byte[] getPicture(int vehicleId, int pictureId) {
		    VehiclePictureEntity picture = vpRepo.findById(pictureId)
		        .orElseThrow(() -> new EntityNotFoundException("Picture not found"));
		    if (picture.getVehicle().getVehicleId() != vehicleId) {
		        throw new IllegalArgumentException("Picture does not belong to the specified vehicle");
		    }
		    return picture.getImage();
		}
		
		//Delete picture by pictureId
		 public void deletePicture(int vehicleId, int pictureId) {
			 	String msg="";
		        VehiclePictureEntity picture = vpRepo.findById(pictureId)
		                .orElseThrow(() -> new EntityNotFoundException("Picture not found"));
		        if (picture.getVehicle().getVehicleId() != vehicleId) {
		            throw new IllegalArgumentException("Picture does not belong to the specified vehicle");
		        }
		        vpRepo.delete(picture);
		        msg= "Picture " +pictureId+ "successfully deleted";
		    }
		 
		 public List<Map<String, Object>> getAllPictures(int vehicleId) {
			    List<VehiclePictureEntity> pictures = vpRepo.findByVehicleVehicleId(vehicleId);
			    List<Map<String, Object>> result = new ArrayList<>();
			    for (VehiclePictureEntity picture : pictures) {
			        try {
			            byte[] imageData = picture.getImage();
			            String base64Image = Base64.getEncoder().encodeToString(imageData);
			            Map<String, Object> pictureMap = new HashMap<>();
			            pictureMap.put("pictureId", picture.getPictureId());
			            pictureMap.put("base64Image", base64Image);
			            result.add(pictureMap);
			        } catch (Exception e) {
			            throw new RuntimeException("Failed to read picture data", e);
			        }
			    }
			    return result;
			}



}

