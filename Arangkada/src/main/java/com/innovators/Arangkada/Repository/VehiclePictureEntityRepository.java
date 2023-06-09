package com.innovators.Arangkada.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.innovators.Arangkada.Entity.VehiclePictureEntity;


public interface VehiclePictureEntityRepository extends JpaRepository<VehiclePictureEntity, Integer> {

	 @Query("SELECT image FROM VehiclePictureEntity WHERE pictureId = :pictureId")
	 byte[] findImageById(@Param("pictureId") int pictureId);
	 List<VehiclePictureEntity> findByVehicleVehicleId(int vehicleId);
	 
}
