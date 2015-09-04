package com.timeoutzero.photor;

import org.joda.time.DateTime;
import org.joda.time.Instant;
import org.joda.time.Interval;
import org.joda.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Data
@ToString
@RequiredArgsConstructor
public class TimerEngine {

	@NonNull
	private RangeDefault range;
	
	public boolean shouldExecuteTimer(Timer timer, DateTime now) {
		return timer.isEnabled() && timer.isSocial() ||
			   timer.isEnabled() && 
			   this.range.isAtDayInterval(now) && 
			   this.range.isAtHourInterval(now);
	}
	
	@Data
	@ToString
	@AllArgsConstructor
	public static class RangeDefault {
		
	    private static final Instant CONSTANT = new Instant(0);
		
		@NonNull
		private Integer start;
		
		@NonNull
		private Integer end;
		
		@NonNull
		private String hourStart;
		
		@NonNull
		private String hourEnd;
		
		private boolean isAtDayInterval(DateTime now) {
			int dayOfWeek = now.getDayOfWeek();
			return dayOfWeek >= this.start && dayOfWeek <= this.end ;
		}
		
		private boolean isAtHourInterval(DateTime now) {
			
			DateTime time1   = new LocalTime(hourStart).toDateTime(CONSTANT);
			DateTime time2 	 = new LocalTime(hourEnd).toDateTime(CONSTANT);  
			DateTime actualHour   = now.toLocalTime().toDateTime(CONSTANT);
			 
			return new Interval(time1, time2).contains(actualHour);
		}
	}
}
