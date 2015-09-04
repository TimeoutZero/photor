package com.timeoutzero.test.photor;

import org.joda.time.DateTime;
import org.joda.time.DateTimeConstants;
import org.joda.time.LocalTime;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import com.timeoutzero.photor.Timer;
import com.timeoutzero.photor.TimerEngine;
import com.timeoutzero.photor.TimerEngine.RangeDefault;

@RunWith(JUnit4.class)
public class PhotorTest {
	
//		DateTimeConstants.MONDAY;
//		DateTimeConstants.TUESDAY;
//		DateTimeConstants.WEDNESDAY;
//		DateTimeConstants.THURSDAY;
//		DateTimeConstants.FRIDAY;
//		DateTimeConstants.SATURDAY;
//		DateTimeConstants.SUNDAY;

	
	@Test
	public void testShouldExecuteTimerAtRangeOfDaysAndHour() throws Exception {
		
		RangeDefault range = new TimerEngine.RangeDefault(DateTimeConstants.FRIDAY, DateTimeConstants.SUNDAY, "12:00", "22:00");
		TimerEngine engine = new TimerEngine(range); 
		
		Timer timer = new Timer("12:00", "22:00");

		// HOUR 17:00
		DateTime date = DateTime.now().withDayOfWeek(DateTimeConstants.SATURDAY).withHourOfDay(17).withMinuteOfHour(0);
		boolean execute = engine.shouldExecuteTimer(timer, date); 
		
		Assert.assertTrue(execute);
		
		// HOUR 12:00 >=
		date = new LocalTime(12, 0).toDateTimeToday().withDayOfWeek(DateTimeConstants.SATURDAY);
		execute = engine.shouldExecuteTimer(timer, date);
		
		Assert.assertTrue(execute);
		
		// HOUR 21:59 <
		date = new LocalTime(21, 59).toDateTimeToday().withDayOfWeek(DateTimeConstants.SATURDAY);
		execute = engine.shouldExecuteTimer(timer, date);
		
		Assert.assertTrue(execute);
	}
	 
	@Test
	public void testShouldNotExecuteTimerOutOfHour() throws Exception {
		
		RangeDefault range = new TimerEngine.RangeDefault(DateTimeConstants.FRIDAY, DateTimeConstants.SUNDAY, "12:00", "22:00");
		TimerEngine engine = new TimerEngine(range);
		
		Timer timer = new Timer("12:00", "22:00");

		// HOUR 11:00 < 
		
		DateTime date = DateTime.now().withDayOfWeek(DateTimeConstants.SATURDAY).withHourOfDay(11);
		boolean execute = engine.shouldExecuteTimer(timer, date);
		
		Assert.assertFalse(execute);
		
		// HOUR 22:00 ==
		date = new LocalTime(22, 0).toDateTimeToday().withDayOfWeek(DateTimeConstants.SATURDAY);
		execute = engine.shouldExecuteTimer(timer, date);
		
		Assert.assertFalse(execute);
		
		// HOUR 23:00 >
		date = DateTime.now().withDayOfWeek(DateTimeConstants.SATURDAY).withHourOfDay(23);
		execute = engine.shouldExecuteTimer(timer, date);
		
		Assert.assertFalse(execute);
	}
	
	@Test
	public void testShouldNotExecuteDisabledTimer() throws Exception {
	
		RangeDefault range = new TimerEngine.RangeDefault(DateTimeConstants.FRIDAY, DateTimeConstants.SUNDAY, "12:00", "22:00");
		TimerEngine rangeDefault = new TimerEngine(range);
		Timer timer = new Timer("12:00", "22:00");
		timer.setEnabled(false);

		DateTime date = DateTime.now().withDayOfWeek(DateTimeConstants.SATURDAY).withHourOfDay(12);
		boolean execute = rangeDefault.shouldExecuteTimer(timer, date);
		
		Assert.assertFalse(execute);
	}
	
	@Test
	public void testShouldExecuteSocialTimerOutOfDefaultRange() throws Exception {
		
		RangeDefault range = new TimerEngine.RangeDefault(DateTimeConstants.FRIDAY, DateTimeConstants.SUNDAY, "12:00", "22:00");
		TimerEngine rangeDefault = new TimerEngine(range);
		Timer timer = new Timer("12:00", "22:00");
		timer.setSocial(true);
		
		DateTime date = DateTime.now().withDayOfWeek(DateTimeConstants.MONDAY).withHourOfDay(11);
		boolean execute = rangeDefault.shouldExecuteTimer(timer, date);
		
		Assert.assertTrue(execute);
	}
}
