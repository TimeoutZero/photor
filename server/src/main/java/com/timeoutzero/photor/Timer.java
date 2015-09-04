package com.timeoutzero.photor;

import org.joda.time.LocalTime;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@ToString
@RequiredArgsConstructor
public class Timer {

	@NonNull
	private String start;
	
	@NonNull
	private String end;
	
	private boolean isSocial  = false;
	private boolean isEnabled = true;
	
	
	public LocalTime start() {
		return new LocalTime(this.start);
	}
	
	public LocalTime end() {
		return new LocalTime(this.end);
	}
}
